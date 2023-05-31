const { resolve } = require("path");
const { PROJECT_PATH, IS_DEV } = require("./config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackBar = require("webpackbar");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

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
  entry: resolve(PROJECT_PATH, "./src/index.tsx"),
  output: {
    filename: IS_DEV
      ? "assets/js/[name].js"
      : "assets/js/[name]-[chunkhash:8].js",
    path: resolve(PROJECT_PATH, "./dist"),
  },
  cache: { type: "filesystem" },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        loader: "babel-loader",
        options: { cacheDirectory: true },
        include: [resolve("src")],
        exclude: /node_modules/,
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
              limit: 1024 * 10,
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
              limit: 1024 * 10,
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: IS_DEV
        ? "assets/styles/[name].css"
        : "assets/styles/[name]-[contenthash:8].css",
      chunkFilename: IS_DEV
        ? "assets/styles/[id].css"
        : "assets/styles/[id]-[contenthash:8].css",
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(PROJECT_PATH, "./public/index.html"),
      cache: false,
      minify: IS_DEV
        ? false
        : {
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            useShortDoctype: true,
          },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(PROJECT_PATH, "./public"),
          to: "public",
          force: true,
          noErrorOnMissing: true,
          globOptions: {
            dot: true,
            gitignore: false,
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new WebpackBar({
      color: "orange",
      name: "WORKING",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 4096,
        configFile: resolve(PROJECT_PATH, "./tsconfig.json"),
        diagnosticOptions: {
          syntactic: false,
          semantic: false,
          declaration: false,
          global: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(PROJECT_PATH, "./src"),
      "@assets": resolve(PROJECT_PATH, "./src/assets"),
      "@components": resolve(PROJECT_PATH, "./src/components"),
      "@pages": resolve(PROJECT_PATH, "./src/pages"),
      "@routes": resolve(PROJECT_PATH, "./src/routes"),
      "@store": resolve(PROJECT_PATH, "./src/store"),
      "@styles": resolve(PROJECT_PATH, "./src/styles"),
      "@utils": resolve(PROJECT_PATH, "./src/utils"),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
  },
  devtool: IS_DEV ? "eval-cheap-module-source-map" : "cheap-module-source-map",
};
