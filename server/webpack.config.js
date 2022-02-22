const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/server.js"),
  devtool: "inline-source-map",
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
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
