import express from 'express';
import fs from 'node:fs/promises';

export const reactRouter = express.Router();

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const base = process.env.BASE || '/';

const createLog = (req, res, next) => {
  res.on('finish', function () {
    console.log(req.method, req.originalUrl, res.statusCode);
  });
  next();
};

reactRouter.use(createLog);

if (isDev) {
  const { createServer } = await import('vite');
  var vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  reactRouter.use(vite.middlewares);
}

let templateHtml;
if (isProduction) {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  reactRouter.use(compression());
  reactRouter.use(base, sirv('./dist/client', { extensions: [] }));

  templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
}

reactRouter.use(async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    if (isDev) {
      templateHtml = await fs.readFile('./index.html', 'utf-8');
      templateHtml = await vite.transformIndexHtml(url, templateHtml);
    }

    const ssrLoader = isDev
      ? await vite.ssrLoadModule('./src/entry-server.tsx')
      : await import('../../dist/server/entry-server.js');
    const rendered = isDev
      ? await ssrLoader.render({ req })
      : ssrLoader.render({ req });

    const html = templateHtml
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    if (isDev) {
      vite.ssrFixStacktrace(e);
    }
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});
