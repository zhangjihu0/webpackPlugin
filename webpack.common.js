const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  =  require('html-webpack-plugin');
const Webpack = require('webpack');
module.exports = {
  entry:path.resolve(__dirname,'./src/index'),
  output:{
    path:path.join(__dirname,'dist'),
    filename:'[name].[hash].js',
  },
  module:{
    rules:[
      {//style-loader将css插入到页面的style,css-loader是处理css文件中的url()
        test:/\.css$/,//loader执行顺序从右向左
        use:['style-loader','css-loader','postcss-loader','less-loader'],
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/
      },{//处理将文件发送到输出文件夹，并返回（相对）URL，文件小于限制，可以返回 data URL
        test:/\.(jpg|png|gif|svg)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:'1024',
            path:'./dist/img'
          }
        }],
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react'] // env转换es6 stage-0转es7 react转react
          }
        },
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new HtmlWebpackPlugin({
      title:'react Demo',
      template:path.join(__dirname,'public/template.html')
    }),
  ]

}