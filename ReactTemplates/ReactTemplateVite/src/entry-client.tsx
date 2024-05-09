import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './components/App/App';
import './index.module.css';

const BASE = import.meta.env.BASE_URL;
const BrowserRouterProps = { basename: BASE };

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
