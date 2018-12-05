var merge = require("webpack-merge");
var webpack = require("webpack");
var HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var commonConfig = require("./webpack.common.config");
var scripts = require("./scripts");
var rootDir = path.resolve(__dirname, '../');

var config = merge(commonConfig, {
    entry: {
        vendor: scripts.vendor,
        app: ['babel-polyfill', '../src/main.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'react-hot-loader',
                    'babel-loader'
                ],
                exclude: [
                    path.resolve(rootDir, 'node_modules')
                ]
            },
            {
                test: /\.css/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, 
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '../web'),
        port: 4000,
        compress: true,
        disableHostCheck: true,
        hot: true,
        proxy: [
            {
                context: [],
                target: "http://127.0.0.1",
                secure: false
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: '../template/index.html',
            title: "agentSystem",
            time:  new Date().getTime(),
        })
    ]
});

module.exports = config;