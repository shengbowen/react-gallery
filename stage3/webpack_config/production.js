const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./base');
const defaultSettings = require('./defaults');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Add needed plugins here
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const config = Object.assign({}, baseConfig, {
  entry: {
    app: [path.join(defaultSettings.srcPath, 'index')],
  },
  output: {
    path: defaultSettings.distOutPath,
    filename: 'react/[name].[chunkhash].js',
    publicPath: './',
  },
  cache: false,
  devtool: 'sourcemap',
  devServer: {
    contentBase: defaultSettings.distOutPath,
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: '/',
    noInfo: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new AssetsPlugin({
      path: defaultSettings.manifestPath,
      filename: 'app.assets.json',
    }),
    // new ExtractTextPlugin('styles/[name].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [{
        test: /\.(jpg|gif|png|swf|ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=8192&name=/images/[hash:8].[name].[ext]',
        // query: { name: '[name].[hash:base64:5].[ext]' },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(defaultSettings.cssLoaders),
        exclude: `${defaultSettings.srcPath}/vendors/`,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: `${defaultSettings.srcPath}/vendors/`,
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
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