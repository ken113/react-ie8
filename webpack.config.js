var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


config = {
    entry: {
        bundle:[
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            path.resolve(__dirname, './app/main.js')
        ],
        vendor:[
            'jquery',
            'react',
            'react-dom'
        ]
    },

    output: {
        path: path.resolve(__dirname),
        filename: '[name].[hash].js',
    },
    module: {
        loaders:[
            {
                test: /\.(js|jsx)$/,
                loaders: [ 'es3ify-loader','babel?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-runtime,plugins[]=transform-es3-property-literals'],
                exclude: /node_modules/,
            },/*{
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query:{
                    presets: ['es2015','react','stage-0'],
                    plugins: ['transform-runtime','transform-es3-property-literals']
                }
            },*/{
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract( "style-loader", "css-loader","postcss-loader" )
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ],
    },
        
    resolve: {
        extensions: ['', '.js', '.jsx','css','scss'],
        alias: {
            'jquery': path.resolve(__dirname, './node_modules/jquery/dist/jquery.min.js'),
            'react-dom':path.resolve(__dirname, './node_modules/react-dom/dist/react-dom'),
            'redux':path.resolve(__dirname, './node_modules/redux/dist/redux'),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            inject: true
        }),
        new ExtractTextPlugin("style.[hash].css", {
              allChunks: true,
              disable: false
        }),
        /*new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })*/
    ],
};

module.exports = config;