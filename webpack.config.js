const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');
const setIterm2Badge = require('set-iterm2-badge');
setIterm2Badge('this is 水印嘻嘻嘻');
const argv = require('yargs-parser')(process.argv.slice(2))
const mode = argv.mode || "development";
const isProduction = (mode === "production");
const merge = require("webpack-merge");
const _mergeConfig = require(`./config/webpack.${mode}.js`);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 多核压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// 监控面板
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// 通知
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

// 进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 标题
const setTitle = require('node-bash-title');
setTitle('🍻  Server');

// 离线缓存
const ManifestPlugin = require('webpack-manifest-plugin');


// loading
const loading = {
	html: '加载中...'
};

// 分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfig = {
	devServer: {
		port: 3000,
		hot: true,
		before(app) {
			app.get('/api/test', (req, res) => {
				res.send({
					success: true,
					message: 'hello'
				});
			});
		}
	},
	optimization: {
		splitChunks: {
			chunks: "initial",
			cacheGroups: {
				commons: {
					chunks: "initial",
					name: "common",
					minChunks: 1,
					maxInitialRequests: 5,
					minSize: 0
				}
			}
		},
		// 提取runtime包
		runtimeChunk: {
			name: "runtime"
		},
		// 第三方压缩插件，开启多核压缩
		minimizer: [
			new TerserPlugin({
				parallel: true
			})
		]
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: __dirname + 'node_modules',
			include: __dirname + 'src',
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env', 'es2015'],
					plugins: ["dynamic-import-webpack"]
				}
			}
		}, {
			//     test: /\.css$/,
			// loader: ExtractTextPlugin.extract({
			//   fallbackLoader: 'style-loader',
			//   loader: 'css-loader'
			// })

			test: /\.less$/,
			use: [{
					loader: MiniCssExtractPlugin.loader,
				},
				{
					loader: 'css-loader',
					options: {
						// modules: {
						// 	localIdentName: "[name]_[local]_[hash:base64]",
						// },
						sourceMap: true
					}
				},
				{
					loader: 'less-loader'
				}
			]
		}]
	},
	plugins: [
		new ManifestPlugin(),
		new ProgressBarPlugin(),
		new WebpackBuildNotifierPlugin({
			title: "spa-Webpack Build",
			suppressSuccess: true
		}),
		// 深度tree-sharking js
		new WebpackDeepScopeAnalysisPlugin(),
		// 提取css为单独文件
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: isProduction ? 'styles/[name].[hash:5].css' : 'styles/[name].css',
			chunkFilename: isProduction ? 'styles/[id].[hash:5].css' : 'styles/[id].css',
		}),
		// tree-sharking css
		// new PurifyCSSPlugin({
		// 	// Give paths to parse for rules. These should be absolute!
		// 	paths: glob.sync(path.join(__dirname, './dist/*.html')),
		// }),
		// 清理dist
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			loading
		}),
		new BundleAnalyzerPlugin()
	]
};

module.exports = smp.wrap(
	merge(_mergeConfig, webpackConfig)
);