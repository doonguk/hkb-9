const path = require("path");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",

  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    port: 9000,
    hot: true,
  },
});
