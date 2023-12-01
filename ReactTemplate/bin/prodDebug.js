const webpack = require('webpack');
const nodemon = require('nodemon');
const path = require('path');
const config = require('../webpack.config');

const compilerServer = webpack(config);

console.time('Server compiled');
compilerServer.run((err) => {
  if (err) console.error('Server error\n' + err);
  console.timeEnd('Server compiled');

  compilerServer.watch({}, (err) => {
    if (err) console.error('Watch server error\n' + err);
    console.log('Server webpack watching');
  });

  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [path.resolve(__dirname, '../dist/server')],
  });
});
