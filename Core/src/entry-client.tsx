import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './components/App/App';
import './index.css';

const BrowserRouterProps = { basename: import.meta.env.BASE_URL.slice(0, -1) };

if (import.meta.env.DEV) {
  //////////////////////
  const root = createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <BrowserRouter {...BrowserRouterProps}>
      <App />
    </BrowserRouter>
  );
  //////////////////////
} else {
  //////////////////////
  hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <BrowserRouter {...BrowserRouterProps}>
      <App />
    </BrowserRouter>
  );
  //////////////////////
}
