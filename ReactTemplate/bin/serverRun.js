const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');

const webpacker = webpack(webpackConfig);

console.time('Cold compilation');

webpacker.run(() => {
  console.timeEnd('Cold compilation');

  webpacker.watch({}, () => {
    console.log('Reloaded');
  });

  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),
      path.resolve(__dirname, '../dist/client'),
    ],
  });
});
