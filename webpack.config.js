const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  entry: "./src/bootstrap.tsx",
  mode: "development",
  cache: false,
  target: "web",
  output: { publicPath: "/" },
  resolve: {
    alias: {
      src: "/src",
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    // Uncomment this, if you're using react@17
    // fallback: {
    //   "react/jsx-runtime": "react/jsx-runtime.js",
    //   "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
    // },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          "postcss-loader",
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/main.css",
    }),
    // new ModuleFederationPlugin({
    //   name: "host", // You can change this if you want :)
    //   remotes: {
    //     // Your known remotes
    //     // "@remote": "app_name@http://localhost:3002/remoteEntry.js",
    //   },
    //   shared: [
    //     deps,
    //     {
    //       react: {
    //         eager: true,
    //         singleton: true,
    //         requiredVersion: deps.react,
    //       },
    //     },
    //     {
    //       "react-dom": {
    //         eager: true,
    //         singleton: true,
    //         requiredVersion: deps["react-dom"],
    //       },
    //     },
    //   ],
    // }),
  ],
  devtool: "source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: process.env.FRONTEND_PORT,
    static: path.join(__dirname, "dist"),
  },
};
