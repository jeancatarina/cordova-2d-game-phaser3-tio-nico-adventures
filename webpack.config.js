const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyEsPlugin = require("uglify-es-webpack-plugin");

const host = "0.0.0.0";
const port = 8080;

const SRC = path.resolve(__dirname, "src");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "www"),
    filename: "main.js"
  },
  devServer: {
    host,
    port,
    hot: true,
    disableHostCheck: true,
    clientLogLevel: "silent",
    inline: true,
    contentBase: path.resolve(__dirname, "src"),
    watchContentBase: true
  },
  optimization: {
    minimizer: [
      new UglifyEsPlugin({
        compress: {
          drop_console: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            esModule: false
          }
        }
      },
      {
        test: /\.mp3$/,
        include: SRC,
        loader: "file-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
