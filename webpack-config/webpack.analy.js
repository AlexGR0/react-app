const prodConfig = require('./webpack.prod');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const { merge } = require('webpack-merge');

// 预留合并空位加入自定义配置对比
module.exports = smp.wrap(merge(prodConfig, {}));
