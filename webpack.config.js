const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");

const config = {
  entry: "./app/app.js",
  output: {
    filename: "appBundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
  },
  mode: "development",
  devtool: "eval-cheap-source-map",

  plugins: [new HtmlWebpackPlugin({ template: "./app/index.html" })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        // 1.順序不可更動。2.css-loader負責將css能夠包在js檔，但是樣式的轉換必須經由style-loader更新
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: [/\.js$/, /\.jsx$/ ] ,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: 3, targets: "defaults" },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
};

if (currentTask == "build") {
  config.mode = "production";
  // 將style-loader置換成MiniCssExtractPlugin loader，因為style-loader負責將包在js內的css進行style更新，但今天要將css分離出來就不需要style-loader了
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: "main_extract.[hash].css" }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
  );
}

module.exports = config;
