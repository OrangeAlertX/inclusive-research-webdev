import 'dotenv/config';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './components/App/App';
import path from 'path-browserify';

export function render(props) {
  const { req } = props;
  const BASE = process.env.BASE ?? '/';

  const html = renderToString(
    <StaticRouter basename={BASE} location={path.join(BASE, req ?? '')}>
      <App />
    </StaticRouter>
  );

  return { html };
}
