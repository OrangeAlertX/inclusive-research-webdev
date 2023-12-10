import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(props) {
  const { url } = props;

  const html = renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  return { html };
}
