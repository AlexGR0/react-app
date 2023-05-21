const {join, resolve} = require('path');

module.exports = {
  mode: 'development',
  entry: resolve('./src/index'),
  output:{
    filename: 'bundle.js',
    path: resolve(__dirname, '../dist')
  }
};