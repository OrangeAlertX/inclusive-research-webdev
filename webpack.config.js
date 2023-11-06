const path = require('path');

module.exports = (env, args) => {
  const isDev = args.mode === 'development';

  return {
    entry: `./Paired-Colors/js/index.js`,
    output: {
      path: path.resolve(__dirname, `Paired-Colors/dist`),
      filename: 'main.js',
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};
