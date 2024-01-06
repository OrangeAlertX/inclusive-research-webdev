import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './components/App/App';
import './index.css';

if (import.meta.env.DEV) {
  //////////////////////
  const root = createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  //////////////////////
} else {
  //////////////////////
  hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  //////////////////////
}
