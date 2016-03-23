var webpack = require('webpack')

module.exports = {
  entry: './frontend/index.js',
  output: {
    publicPath: 'http://localhost:3001/',
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
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  }
}

// module.exports = {
//   entry: [
//     'webpack-dev-server/client?http://localhost:3001', // WebpackDevServer host and port
//     'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
//     './frontend/index.js' // Your appʼs entry point
//   ],
//   output: {
//     publicPath: 'http://localhost:3001/',
//     filename: 'bundle.js'
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         loaders: ['react-hot','babel'],
//         exclude: /node_modules/
//       },
//       {
//         test: /\.less$/,
//         loader: 'style!css!less'
//       }
//     ]
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ]
// }