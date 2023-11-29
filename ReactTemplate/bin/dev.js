const webpack = require('webpack');
const nodemon = require('nodemon');
const path = require('path');
const { serverConfig } = require('../webpack.config');
const { clientConfig } = require('../webpack.config');

const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const cors = require('cors');
// const { createProxyMiddleware } = require('http-proxy-middleware');

const hmr = express();
const compilerClient = webpack(clientConfig);

// const hmrProxy = createProxyMiddleware({
//   target: 'http://localhost:5500',
//   changeOrigin: true,
// });

// hmr.use(hmrProxy);

hmr.use(
  cors({
    origin: [
      'http://localhost:5501',
      'http://localhost:5500',
      'http://127.0.0.2:5500',
      'http://127.0.0.2:5501',
    ],
  })
);

// hmr.use('/client/', express.static('dist/client'));

hmr.use(
  webpackDevMiddleware(compilerClient, {
    publicPath: clientConfig.output.publicPath,
    writeToDisk: true,
    stats: 'errors-only',
  })
);

hmr.use(
  webpackHotMiddleware(compilerClient, { path: '/client/__webpack_hmr' })
);

hmr.use('/', (req, res) => res.send('HMR is online'));

hmr.listen(5501, () => console.log('HMR server ready'));

const compilerServer = webpack(serverConfig);

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
