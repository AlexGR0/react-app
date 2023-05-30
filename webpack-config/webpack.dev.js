const { resolve } = require("path");
const { merge } = require("webpack-merge");
const { PORT, HOST, PROJECT_PATH } = require("./config");
const webpackCommon = require("./webpack.common");

module.exports = merge(webpackCommon, {
  mode: "development",
  devServer: {
    host: HOST,
    port: PORT,
    open: true,
    hot: true,
    compress: true,
    // historyApiFallback: true,
    client: {
      logging: "error",
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    static: resolve(PROJECT_PATH, "./public"),
  },
});
