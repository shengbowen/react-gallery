const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const defaultSettings = require('./defaults');

// Add needed plugins here
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(defaultSettings.devOutPath);

const config = Object.assign({}, baseConfig, {
  entry: {
    app: [
      `webpack-dev-server/client?http://127.0.0.1:${defaultSettings.port}`,
      'webpack/hot/dev-server',
      'react-hot-loader/patch',
      './src/index',
    ],
  },
  output: {
    path: defaultSettings.devOutPath,
    filename: 'react/[name].dev.js',
    publicPath: '/',
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('style.dev.css', { allChunks: true }),
    new AssetsPlugin({
      path: defaultSettings.manifestPath,
      filename: 'app.assets.json',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
        test: /\.(gif|jpg|png|swf|ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=8192',
        // query: { name: '[name].[hash:base64:5].[ext]' },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(defaultSettings.cssLoaders),
        exclude: `${defaultSettings.srcPath}/vendors/`,
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded',
        include: `${defaultSettings.srcPath}/vendors/`,
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        include: defaultSettings.srcPath,
        exclude: `${defaultSettings.srcPath}/vendors/`,
      },
      {
        test: '/\.json$/',
        loader: 'json-loader'
      }
    ],
  },
});

module.exports = config;