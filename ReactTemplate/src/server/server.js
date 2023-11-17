import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';
import indexHTML from './indexTemplate';

const app = express();

app.use('/client/', express.static('dist/client'));

if (process.env.NODE_ENV === 'development') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const clientConfig = require('/cfg/webpack.client.config');
  const webpack = require('webpack');

  const compilerClient = webpack(clientConfig);

  app.use(
    webpackDevMiddleware(compilerClient, {
      publicPath: clientConfig.output.publicPath,
    })
  );

  app.use(webpackHotMiddleware(compilerClient));
}

app.get('/', (req, res) => res.send(indexHTML(renderToString(<App />))));

app.listen(5500, () => console.log(new Date().toLocaleTimeString()));
