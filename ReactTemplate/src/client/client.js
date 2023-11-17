import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from '../shared/App';

if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
  });
} else {
  window.addEventListener('load', () => {
    hydrateRoot(document.getElementById('app'), <App />);
  });
}
