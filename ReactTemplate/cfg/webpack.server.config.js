const path = require('path');
const process = require('process');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

const serverConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  target: 'node',
  entry: path.resolve(process.cwd(), './src/server/server.js'),
  output: {
    path: path.resolve(process.cwd(), './dist/server'),
    filename: 'server.js',
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  plugins: isDev ? [new CleanWebpackPlugin()] : [],
  // watchOptions: isDev
  //   ? {
  //       ignored: /App\.jsx/,
  //     }
  //   : {},
};

module.exports = merge(commonConfig, serverConfig);
