var merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var commonConfig = require('./webpack.common.config');
var scripts = require('./scripts');
var rootDir = path.resolve(__dirname, '../');

const extractCSS = new ExtractTextPlugin({
    filename: "static/styles/style.[chunkhash]-css.css",
    allChunks: true
});

const extractLESS = new ExtractTextPlugin({
    filename: 'static/styles/style.[chunkhash]-less.css',
    allChunks: true,
});


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
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ],
                    publicPath: '../../'
                })
            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { 
                                minimize: true 
                            }
                        }, 
                        {
                            loader: 'less-loader',
                        }
                    ],
                    publicPath: '../../'
                })
            },
        ]
    },

    plugins: [
        new Clean('./build', {
            root: rootDir
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
            },
            minimize: true,
            sourceMap: false,
            exclude: [/node_modules/],
            output: {
                comments: false,
                ascii_only: true
            }
        }),
        new CopyWebpackPlugin([
            {
                from: '../web',
                to: "../build"
            }
        ]),
        new HtmlWebpackPlugin({
            template: '../template/index.html',
            title: 'Monitor',
            time: new Date().getTime(),
        }),
        extractCSS,
        extractLESS,
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
});

module.exports = config;
