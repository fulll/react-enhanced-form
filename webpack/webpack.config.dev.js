const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  context: resolve(__dirname, '../'),
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
