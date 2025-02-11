const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: process.env.PUBLIC_URL || "/", // GitHub Actions で渡された PUBLIC_URL を利用する
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "src/index.html", to: "index.html" }],
    }),
  ],
};
