const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/demo/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'src/demo/build'),
    filename: "[name].js",
  },
  module: {
    loaders: [
      {
        test: /\.js?$|\.jsx?$/,
        include: path.resolve(__dirname, 'src/'),
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
  }
}