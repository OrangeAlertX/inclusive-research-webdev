import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from '../shared/App';

// if (process.env.NODE_ENV === 'production') {
// Production only
hydrateRoot(document.getElementById('app'), <App />);
///////////////////////////////////
// } else {
//   // Develompent only
//   const root = createRoot(document.getElementById('app'));
//   root.render(<App />);
//     /////////////////////////////////
// }
