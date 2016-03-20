var webpack = require('webpack')

module.exports = {
  entry: './frontend/index.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {compact: false}
      },
      {
        test: /\.jsx?$/,
        loader: 'eslint'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  }
}