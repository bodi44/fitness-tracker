const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/src',

  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },

  watch: false,

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      hash: true,
    }),
  ],
};
