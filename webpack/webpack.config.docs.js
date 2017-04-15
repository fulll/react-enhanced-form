const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: resolve(__dirname, '../'),
  entry: [
    'babel-polyfill',
    './example/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../docs'),
    publicPath: '/react-enhanced-form/',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    new HtmlWebpackPlugin({ template: 'webpack/index-template.html' }),
  ],
}
