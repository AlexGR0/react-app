const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      importLoaders: 1,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: ["postcss-preset-env"],
      },
    },
  },
];

module.exports = {
  mode: "development",
  entry: resolve("./src/index.ts"),
  output: {
    filename: "[name].js",
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
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [...commonCssLoader, "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/styles/[name]-[contenthash:5].css",
    }),
  ],
};
