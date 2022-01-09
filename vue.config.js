const path = require("path");

module.exports = {
  publicPath: "./",
  outputDir: path.resolve(__dirname, process.env.OUTPUT_DIR),
};
