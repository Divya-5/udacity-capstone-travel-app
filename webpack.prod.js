const path = require('path');
const webpack = require('webpack');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/public/js/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|svg|jpg|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new WorkboxPlugin.GenerateSW(),
    new HTMLWebPackPlugin({
      template: './src/public/index.html',
      filename: 'index.html'
    })
  ]
}