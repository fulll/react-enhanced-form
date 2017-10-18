const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  context: resolve(__dirname, '../'),
  entry: [
    './src/index.js',
  ],
  output: {
    filename: 'index.js',
    path: resolve(__dirname, '../lib'),
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
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
    new webpack.optimize.UglifyJsPlugin(),
  ],
}
