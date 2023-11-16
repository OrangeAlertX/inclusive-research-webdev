import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import TestComponent from '../shared/TestComponent';

window.addEventListener('load', () => {
  hydrateRoot(document.getElementById('app'), <TestComponent />);
});
