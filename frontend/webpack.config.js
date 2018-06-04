const webpack = require('webpack');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
   
    devServer: {
        port: 3000,
        contentBase: './public'
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".json", ".jsx"]
    },
    plugins:[
        new MinCssExtractPlugin({
            filename:'styles.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-2']
                    }
                }
            },
            {

                test: /\.css$/,
                use: [
                    MinCssExtractPlugin.loader, 
                    // 'style-loader', 
                    'css-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
};