const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  entry: resolve("./src/index.tsx"),
  output: {
    filename: "assets/js/[name].[chunkhash:8].js",
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
      {
        test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
        use: { loader: "file-loader" },
        generator: {
          filename: "assets/font/[name]-[contenthash:8].[ext]",
        },
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "assets/images/[name]-[contenthash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "assets/media/[name]-[contenthash:8].[ext]",
                },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
      "@assets": resolve("../src/assets"),
      "@components": resolve("../src/components"),
      "@pages": resolve("../src/pages"),
      "@routes": resolve("../src/routes"),
      "@store": resolve("../src/store"),
      "@utils": resolve("../src/utils"),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/styles/[name]-[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(__dirname, "../public/index.html"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 9000,
    static: resolve(__dirname, "../public/index.html"),
  },
};
