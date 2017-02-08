/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */


const path = require('path');
const qs = require('qs');

const dirName = '/react/';
const tmpPath = path.join(__dirname, '/../tmp/');
const srcPath = path.join(__dirname, '/../src');
const manifestPath = path.join(__dirname, '/../dist/');
const devOutPath = path.join(tmpPath, dirName);
const distOutPath = path.join(manifestPath, dirName);
const publicPath = dirName;
const dfltPort = 8000;

const cssLoaders = [
  {
    loader: 'css-loader',
    query: { // see https://github.com/webpack/css-loader
      importLoaders: 1, // import 语句经过postcss-loader处理
      modules: null, // 启用css modules
      camelCase: null, // css中含有短横线的类名，js中转换为驼峰
      localIdentName: '[name]---[local]---[hash:base64:5]',
    },
  }, {
    loader: 'postcss-loader',
  },
];

const qsStringify = obj => qs.stringify(obj, {
  arrayFormat: 'brackets',
  encode: false,
  strictNullHandling: true, // 值为null的转换为没有等号的形式
});

const combineLoaders = loaders =>
  loaders.map((item) => {
    var query = qsStringify(item.query);
    if (query) {
      query = `?${query}`;
    }
    return item.loader + query;
  }).join('!');

module.exports = {
  srcPath,
  tmpPath,
  manifestPath,
  devOutPath,
  distOutPath,
  publicPath,
  port: dfltPort,
  cssLoaders: combineLoaders(cssLoaders),
};
