const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  context: resolve(__dirname, '../'),
  entry: [
    'babel-polyfill',
    './index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}
