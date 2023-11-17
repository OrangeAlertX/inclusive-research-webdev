const path = require('path');
const process = require('process');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
if (NODE_ENV !== 'development' && NODE_ENV !== 'production')
  throw 'NODE_ENV not development or production';

const clientConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  entry: path.resolve(process.cwd(), './src/client/client.js'),
  output: {
    path: path.resolve(process.cwd(), './dist/client'),
    filename: 'client.js',
    publicPath: '/client/',
  },
  devtool: isDev ? 'eval' : false,
  plugins: isDev ? [new CleanWebpackPlugin()] : [],
};

module.exports = merge(commonConfig, clientConfig);
