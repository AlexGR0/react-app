const { PORT, HOST, PROJECT_PATH } = require('./config');
const webpackCommon = require('./webpack.common');
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(webpackCommon, {
  mode: 'development',
  plugins: [new ESLintPlugin({ extensions: ['js', 'ts'] })],
  devServer: {
    // https: true,
    host: HOST,
    port: PORT,
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: {
      // 处理history路由404问题
      disableDotRule: true,
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    static: resolve(PROJECT_PATH, './public'),
    // proxy: {
    //   "/api/**": {
    //     target: "https://...",
    //     pathRewrite: { "^/api": "" },
    //     changeOrigin: true,
    //   },
    // },
  },
});
