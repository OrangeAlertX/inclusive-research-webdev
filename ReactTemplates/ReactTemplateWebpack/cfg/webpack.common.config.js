const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

module.exports = {
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
      },
    ],
  },
};
