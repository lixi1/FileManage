var path = require('path');
var webpack = require("webpack");

module.exports = {
    context: __dirname,
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'static/javascript/[name].[chunkhash].js',
        chunkFilename: 'static/javascript/[name].[chunkhash].[id].js',
        pathinfo: true
    },
    resolve: {
        // 引入文件时可省略文件后缀
        extensions: ['.js', '.json', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/iconfonts/[hash].[ext]',
                    minetype: 'application/font-woff'
                }
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/iconfonts/[hash].[ext]',
                    minetype: 'application/font-woff'
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/iconfonts/[hash].[ext]',
                    minetype: 'application/octet-stream'
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'static/iconfonts/[hash].[ext]'
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/iconfonts/[hash].[ext]',
                    minetype: 'application/image/svg+xml'
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/iconfonts/[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: 'static/javascript/vendor.bundle.js',
            minChunks: Infinity
        })
    ]
}