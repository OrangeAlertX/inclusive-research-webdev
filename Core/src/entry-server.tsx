import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './components/App/App';

export function render(props) {
  const { url, req } = props;

  const html = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  return { html };
}
