import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import indexHTML from './indexTemplate';

const logger = require('morgan');
const cors = require('cors');

const app = express();

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

if (process.env.NODE_ENV === 'production') {
  const App = require('../shared/App').default;
  var ReactSSR = indexHTML(renderToString(App()));
  console.log(ReactSSR);
} else {
  var ReactSSR = indexHTML('');
}

app.get('/', (req, res) => res.send(ReactSSR));

app.listen(5500, () =>
  console.log(
    `Server loaded in ${new Date().toLocaleTimeString()} on http://localhost:5500/`
  )
);
