const path = require("path");
const { merge } = require("webpack-merge");
const common = require(path.resolve(__dirname, "webpack.common.js"));

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
  },
});
