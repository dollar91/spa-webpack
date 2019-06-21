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
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
	module: {
		rules: [{
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
      template: 'src/index.html'
		})
	]
};

module.exports = merge(_mergeConfig, webpackConfig);