const webpack = require('webpack');
const nodemon = require('nodemon');
const path = require('path');
const serverConfig = require('../cfg/webpack.server.config');

const compilerServer = webpack(serverConfig);

console.time('Server ready');

compilerServer.run(() => {
  console.timeEnd('Server ready');

  compilerServer.watch({}, () => {
    console.log('Server reloaded');
  });

  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [path.resolve(__dirname, '../dist/server')],
    ignore: ['**/*.jsx'],
  });
});
