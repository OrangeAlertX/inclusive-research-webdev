const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env, args) => {
  const isDev = args.mode === 'development';

  return {
    entry: `./publicCol/js/createGameSection.js`,
    output: {
      path: path.resolve(__dirname, `distCol`),
      filename: 'main.js',
    },
    devtool: isDev ? 'inline-source-map' : false,
    module: {
      rules: [
        {
          test: /\.s?[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [new FaviconsWebpackPlugin('./publicCol/favicon.ico')],
  };
};
