const path = require('path');

module.exports = (env, args) => {
  // const isDev = args.mode === 'development';

  return {
    entry: `./Paired-Colors/js/createGameSection.js`,
    output: {
      path: path.resolve(__dirname, `Paired-Colors/dist`),
      filename: 'main.js',
    },
    devtool: 'inline-source-map',
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
  };
};
