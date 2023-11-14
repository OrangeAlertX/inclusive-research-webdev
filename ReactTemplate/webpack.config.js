const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV; //for express
const isDev = NODE_ENV === 'development';

const folderName = path.basename(path.dirname(__filename));

const root = __dirname.includes(folderName)
  ? __dirname
  : path.resolve(__dirname, projectFolder);

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  mode: NODE_ENV,
  entry: path.resolve(root, 'src/index.jsx'),
  output: {
    path: path.resolve(root, 'dist'),
    filename: 'output.js',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: path.resolve(root, 'index.html') }),
  ],
  devServer: {
    port: 5500,
    open: true,
    hot: isDev,
  },
  devtool: isDev ? 'eval' : false,
};
