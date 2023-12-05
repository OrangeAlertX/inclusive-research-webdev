import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import indexHTML from './indexTemplate';
import App from '../shared/App';

import logger from 'morgan';

const app = express();

app.use(logger('dev'));

app.use('/client/', express.static('dist/client'));

// if (process.env.NODE_ENV === 'production') {
//   ReactSSR = indexHTML(renderToString(App()));
// } else {
//   ReactSSR = indexHTML('');
// }

const ReactSSR = indexHTML(renderToString(<App />));
app.get('/', (req, res) => res.send(ReactSSR));

app.listen(5500, () => console.log(`Server ready on http://localhost:5500/`));
