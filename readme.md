### 启动系统 
`npm install`

`npm run dev:server`

### 本地打包
`npm run dev`

### 线上打包
`npm run prod`

### webpack优化

#### 开发阶段优化

+ 开启多核压缩
`uglifyjs-webpack-plugin`

+ 开启面板监控打包时间等
`speed-measure-webpack-plugin`

+ 开启通知面板
`webpack-build-notifier`

+ 打包进度
`progress-bar-webpack-plugin`

+ 开发面板更清晰(可选)
`webpack-dashboard`

+ 开启窗口标题
`node-bash-title`

#### 生成阶段
+ es6不需要编译 采用
Map,Set等es9语法可能会不支持
````
<script type="module" src=""></script>
<script nomodule src=""></script>
````
`babel-ployfill` 不要打包进去，使用以下链接代替
`https://cdn.polyfill.io/v3/polyfill.min.js?features=es5,es6,es7&flags=gated`

+ 前端缓存小负载
离线缓存 `webpack-manifest-plugin`

+ 单页loading 写插件做真正的loading，算出首页多少资源图片

+ 单页webapp 性能 请求的数量 `runtime`

+ 分析打包结果 CI
1、json文件分析
````
webpack --mode production --profile --json > stats.json
````

2、分析插件
`webpack-bundle-analyzer`

+ test include exclude非常重要





