var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./javascript/space_spelunkers.js",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  }
}
