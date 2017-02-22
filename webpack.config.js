var HtmlWebPackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry:{
        "member-index":[__dirname + '/src/video/member-index.js',
        'webpack-dev-server/client?http://127.0.0.1:8080'],
        "web-index":[__dirname + '/src/video/web-index.js']
    },
    output:{
        publicPath:"http://127.0.0.1:8080/",
        path: __dirname + '/src/webapp/js', //输出文件夹
        filename:'[name].js'    //文件名。不包含路径
    },
    resolve:{
        alias:{
            vue:'vue/dist/vue.js'   //官网抄的
        }
    },
    externals:{

    },
    module:{
        loaders:[
            {test:/\.js$/, loader:"babel", query:{compact:true}},
            //{test:/\.vue$/,loader:"babel!vue", exclude: /node_modules/},   //这里解析顺序是从右到左
            {test:/\.vue$/,loader:"babel!vue"},
            {test:/\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,loader:"file" },
            {test: /\.css$/,loader: 'style-loader!css-loader'},
            {test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,loader: 'file-loader',query: {name: '[name].[ext]?[hash]'}}
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            filename:"/member/index.html",     //用户后台首页
            template:__dirname + '/src/pages/member/index.html',    //模板文件
            inject:'body',
            chunks:['member-index']
        }),
        new HtmlWebPackPlugin({
            filename:"index.html",     //用户后台首页
            template:__dirname + '/src/pages/member/index.html',    //模板文件
            inject:'body',
            chunks:['web-index']
        })
    ]
};