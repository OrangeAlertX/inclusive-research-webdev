import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App/App';

export function render(params) {
  const { url } = params;

  const html = renderToString(<App />);

  return { html };
}
