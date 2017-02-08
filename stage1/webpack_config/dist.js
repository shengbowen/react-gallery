const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./base');
const defaultSettings = require('./defaults');

// Add needed plugins here
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const config = Object.assign({}, baseConfig, {
  entry: {
    app: [path.join(defaultSettings.srcPath, 'index')],
  },
  output: {
    path: defaultSettings.distOutPath,
    filename: '[name].[chunkhash].js',
    publicPath: defaultSettings.publicPath,
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new AssetsPlugin({
      path: defaultSettings.manifestPath,
      filename: 'app.assets.json',
    }),
    new ExtractTextPlugin('style.[chunkhash].css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
        test: /\.(gif|png|swf|ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
        loader: 'file',
        query: { name: '[name].[hash:base64:5].[ext]' },
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
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: defaultSettings.srcPath,
        exclude: `${defaultSettings.srcPath}/vendors/`,
      },
    ],
  },
});

module.exports = config;