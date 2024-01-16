import fs from 'node:fs/promises';
import express from 'express';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const createLog = (req, res, next) => {
  res.on('finish', function () {
    console.log(req.method, req.originalUrl, res.statusCode, res.statusMessage);
  });
  next();
};

// Create http server
const app = express();
app.use(createLog);

// Add Vite or respective production middlewares
const serverURL = ['projects', 'static'];
if (isDev) {
  const { createServer } = await import('vite');
  var vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);

  console.logger = (...args) => setTimeout(() => console.log(...args), 3000);

  app.use('*', async (req, res, next) => {
    try {
      ///////////////////
      const url = req.originalUrl.replace(base, '');

      if (serverURL.includes(url.split('/')[0])) return next();

      console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSS');

      let templateHtml = await fs.readFile('./index.html', 'utf-8');
      templateHtml = await vite.transformIndexHtml(url, templateHtml);

      const ssrLoader = await vite.ssrLoadModule('./src/entry-server.tsx');
      const rendered = await ssrLoader.render({ url, req });

      const html = templateHtml.replace(`<!--app-html-->`, rendered.html);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      ///////////////////
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
}

if (isProduction) {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));

  const templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
  const ssrManifest = await fs.readFile(
    './dist/client/.vite/ssr-manifest.json',
    'utf-8'
  );

  app.use('*', async (req, res, next) => {
    try {
      ///////////////////
      const url = req.originalUrl.replace(base, '');

      if (serverURL.includes(url)) return next();

      const ssrLoader = await import('../dist/server/entry-server.js');
      const rendered = await ssrLoader.render({ url, req, ssrManifest });

      const html = templateHtml
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      ///////////////////
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
}
app.use('/static', express.static('../Landing-Page-Static/static'));

app.use('/projects/', async (req, res) => {
  try {
    const html = await fs.readFile(
      '../Landing-Page-Static/index.html',
      'utf-8'
    );
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    if (isDev) vite.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
