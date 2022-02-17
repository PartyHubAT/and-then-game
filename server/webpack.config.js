const path = require("path");

module.exports = {
  entry: "./server.js",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "../dist"),
    library: {
      type: "commonjs2",
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
