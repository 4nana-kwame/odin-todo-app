const path = require("path");
const { merge } = require("webpack-merge");
const common = require(path.resolve(__dirname, "webpack.common.js"));

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
});
