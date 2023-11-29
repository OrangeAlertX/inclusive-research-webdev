import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import App from '../shared/App';
import indexHTML from './indexTemplate';

const logger = require('morgan');
const cors = require('cors');
// const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// const proxyOptions = {
//   target: 'http://localhost:5501',
//   changeOrigin: true,
// };

// const proxy = createProxyMiddleware('/client', proxyOptions);

// app.use('/client', proxy);

if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: [
        'http://localhost:5501',
        'http://localhost:5500',
        'http://127.0.0.2:5500',
        'http://127.0.0.2:5501',
      ],
    })
  );
}

app.use(logger('dev'));

app.use('/client/', express.static('dist/client'));

app.get('/', (req, res) => res.send(indexHTML(''))); //renderToString(<App />)

app.listen(5500, () =>
  console.log('Server loaded: ', new Date().toLocaleTimeString())
);
