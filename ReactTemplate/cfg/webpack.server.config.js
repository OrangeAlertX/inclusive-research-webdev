const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { WatchIgnorePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

const serverConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              onlyLocals: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
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
  plugins: isDev
    ? [new CleanWebpackPlugin(), new WatchIgnorePlugin({ paths: [/\.jsx$/] })]
    : [new CleanWebpackPlugin()],
};

module.exports = merge(commonConfig, serverConfig);
