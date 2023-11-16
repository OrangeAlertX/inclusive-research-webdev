import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import TestComponent from '../shared/TestComponent';
import indexHTML from './indexTemplate';

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) =>
  res.send(indexHTML(ReactDOM.renderToString(<TestComponent />)))
);

app.listen(5501, () => console.log(new Date().toLocaleTimeString()));
