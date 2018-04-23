1. ## cross-env
```
    https://emila-github.github.io/2017/05/12/npm%20-%20%E4%BD%BF%E7%94%A8cross-env%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%B9%B3%E5%8F%B0%E8%AE%BE%E7%BD%AENODE-ENV%E7%9A%84%E9%97%AE%E9%A2%98/
    cross-env:
        解决不同环境下设置环境变量的问题
        cross-env NODE_ENV=production
```
2. ## webpack 4 model
```
  
    https://github.com/dwqs/blog/issues/60
    --mode production:
       1.默认提供所有可能的优化，如代码压缩/作用域提升等
       2.不支持 watching
       3.process.env.NODE_ENV 的值不需要再定义，默认是 production 
    --mode development:
       1.主要优化了增量构建速度和开发体验
       2.process.env.NODE_ENV 的值不需要再定义，默认是 development
       3.开发模式下支持注释和提示，并且支持 eval 下的 source maps
```
3.  ```
    webpack.DefinePlugin:
        https://juejin.im/post/5868985461ff4b0057794959
        这个插件用来定义全局变量，在webpack打包的时候会对这些变量做替换。
        webpack配置:
            plugins: [
                new webpack.DefinePlugin({
                //与model设置对应
                NODE_ENV:JSON.stringify(process.env.NODE_ENV)
                })
            ]
        code中使用:
            if ('development' === process.env.NODE_ENV) {
                // 开发环境下的逻辑
            } else {
                // 生产环境下
            } 
    ```
4.```
    expose-loader://将在window上添加属性全局使用调试 
        https://doc.webpack-china.org/loaders/expose-loader/
        1.require("expose-loader?libraryName!./file.js");
            // 通过属性名 "libraryName" 暴露 file.js 的 exports 到全局上下文。
            // 在浏览器中，就将可以使用 window.libraryName 访问。
        2.require("expose-loader?$!jquery");
        3.module: {
            rules: [{
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },{
                        loader: 'expose-loader',
                        options: '$'
                    }]
                }]
            }
```
5.```
    关于全局引入插件的对比 expose-loader VS  Webpack.ProvidePlugin
    https://github.com/Wscats/webpack/issues/5
    ***不会被webpack 打包
    expose-loader:[推荐使用]
        不需要任何其他的插件配合，只要将下面的代码添加到所有的loader之前
        require("expose-loader?libraryName!./file.js");
        require("expose-loader?_!loadash");
        let _=require('expose-loader?_!lodash');
        或者
        {
            test: /^lodash$/,
            loader: "expose?_"
        }
        code 使用:
        setTimeout(function(){
            console.log(window._);
        }); 
    ***会被webpack 打包
    Webpack.ProvidePlugin:
        var webpack = require('webpack');
        plugins: [
            new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        ]
        //问题是依旧没有全局的$函数
        //调用语句也难以通过语法校验(因为没有声明$就直接使用)
        //  $函数会自动添加到当前模块的上下文，无需显示声明
```
## 6.externals
```
    官网文档解释的很清楚，就是webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。
    https://github.com/zhengweikeng/blog/issues/10
    webpack:
        externals: {
            jquery: "jQuery"//如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global
        },
    code:
        const $ = require("jquery")
        $("#content").html("<h1>hello world</h1>")
```



