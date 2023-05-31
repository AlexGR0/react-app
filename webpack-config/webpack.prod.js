const { PROJECT_PATH } = require("./config");
const webpackCommon = require("./webpack.common");
const { resolve } = require("path");
const glob = require("glob");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(webpackCommon, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve(PROJECT_PATH, "./src")}/**/*`, {
        nodir: true,
      }),
      only: ["dist"],
      // safelist: {
      //   standard: [/^ant-/],
      // },
    }),
    new CompressionPlugin({
      test: /.(js|css)$/,
      filename: "[path][base].gz",
      algorithm: "gzip",
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: "runtime",
    },
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
      new CssMinimizerPlugin(),
    ].filter(Boolean),
    splitChunks: {
      chunks: "async",
      minChunks: 1,
      minSize: 100000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: "vendors",
          minChunks: 1,
          chunks: "initial",
          minSize: 0,
          priority: 1,
        },
        commons: {
          name: "commons",
          minChunks: 2,
          chunks: "initial",
          minSize: 0,
        },
      },
    },
  },
});
