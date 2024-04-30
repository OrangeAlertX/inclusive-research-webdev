import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './components/App/App';

export function render(props) {
  const { req } = props;

  const html = renderToString(
    <StaticRouter
      basename={process.env.BASE.slice(0, -1) ?? '/'}
      location={process.env.BASE + req.url}
    >
      <App />
    </StaticRouter>
  );

  return { html };
}
