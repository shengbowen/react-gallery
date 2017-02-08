const path = require('path');
const webpack = require('webpack');

const defaultSettings = require('./defaults');

module.exports = {
  port: defaultSettings.port,
  devServer: {
    contentBase: defaultSettings.srcPath,
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: true,
  },
  resolve: {
    root: path.resolve('src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      reducers: `${defaultSettings.srcPath}/reducers/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/`,
      vendors: `${defaultSettings.srcPath}/vendors/`,
      utils: `${defaultSettings.srcPath}/utils/`,
      views: `${defaultSettings.srcPath}/views/`,
    },
  },
  postcss: () => [
    require('postcss-import')({
      path: defaultSettings.srcPath,
      addDependencyTo: webpack,
    }),
    require('postcss-cssnext')({
      browsers: '> 1% in CN',
    }),
    require('postcss-nested'),
  ],
};