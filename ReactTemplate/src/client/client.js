import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from '../shared/App';

const root = createRoot(document.getElementById('app'));
root.render(<App />); // hydrateRoot(document.getElementById('app'), <App />);

if (module.hot) {
  module.hot.accept('../shared/App', () => {
    const HotApp = require('../shared/App').default;
    root.render(<HotApp />);
  });
}
