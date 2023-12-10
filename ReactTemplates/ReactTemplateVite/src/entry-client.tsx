import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

if (import.meta.env.DEV) {
  //////////////////////
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
  //////////////////////
} else {
  //////////////////////
  hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  //////////////////////
}
