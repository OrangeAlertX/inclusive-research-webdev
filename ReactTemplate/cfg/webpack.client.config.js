const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV; //for express
const isDev = NODE_ENV === 'development';
if (!NODE_ENV || (!isDev && NODE_ENV !== 'production'))
  throw 'NODE_ENV not development or production';

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  mode: NODE_ENV,
  entry: path.resolve(__dirname, '../src/client/client.js'),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
      },
    ],
  },
  //This is needed if you don't have your own server//
  // plugins: [
  //   new HTMLWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
  // ],
  // devServer: {
  //   port: 5500,
  //   open: true,
  //   hot: isDev,
  // },
  devtool: isDev ? 'eval' : false,
};
