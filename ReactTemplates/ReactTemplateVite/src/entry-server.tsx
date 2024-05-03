import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './components/App/App';

export function render(props) {
  const { req } = props;
  const BASE = process.env.BASE ?? '';

  const html = renderToString(
    <StaticRouter basename={BASE} location={BASE + req.url}>
      <App />
    </StaticRouter>
  );

  return { html };
}
