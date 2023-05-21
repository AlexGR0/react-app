const { join, resolve } = require("path");

module.exports = {
  mode: "development",
  entry: resolve("./src/index"),
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
