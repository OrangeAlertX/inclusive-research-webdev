const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
if (NODE_ENV !== 'development' && NODE_ENV !== 'production')
  throw 'NODE_ENV not development or production';

const clientConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  entry: isDev
    ? [
        path.resolve(process.cwd(), './src/client/client.js'),
        'webpack-hot-middleware/client?path=http://localhost:5501/client/__webpack_hmr',
      ]
    : [path.resolve(process.cwd(), './src/client/client.js')],
  output: {
    path: path.resolve(process.cwd(), './dist/client'),
    filename: 'client.js',
    publicPath: '/client/',
  },
  devtool: isDev ? 'eval' : false,
  plugins: isDev
    ? [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()]
    : [new CleanWebpackPlugin()],
  devServer: isDev
    ? {
        contentBase: path.resolve(process.cwd(), '../dist/client/'),
        publicPath: '/client/',
        port: '5500',
        watchContentBase: true,
      }
    : {},
};

module.exports = merge(commonConfig, clientConfig);
