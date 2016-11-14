var  path = require('path');
var  webpack = require('webpack');
var  HtmlWebpackPlugin = require('html-webpack-plugin');
var  ExtractTextPlugin = require('extract-text-webpack-plugin');

var  isProduction = function() {
    return process.env.NODE_ENV === 'production';
};

config = {
    entry: {
        bundle: [
                'webpack/hot/dev-server',
                'webpack-dev-server/client?http://localhost:8080',
                path.resolve(__dirname, './app/main.js')
            ]
    },

    output: {
        path: path.resolve(__dirname),
        filename: '[name].[hash].js'
    },
    externals: {
        'react': 'React',
        'jquery': 'jQuery'
    },
    module: {
        loaders: [{
                test: /\.(js|jsx)$/,
                loaders: ['es3ify-loader', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-runtime'],
                exclude: /node_modules/
            },{
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx', 'css', 'scss'],
        alias: {
            'jquery': path.resolve(__dirname, './node_modules/jquery/dist/jquery.min.js'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom.min.js'),
            'redux': path.resolve(__dirname, './node_modules/redux/dist/redux.js')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            inject: true
        }),
        new ExtractTextPlugin('style.[hash].css', {
            allChunks: true,
            disable: false
        })
        /*new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })*/
    ]
};

module.exports = config;