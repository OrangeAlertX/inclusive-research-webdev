import fs from 'node:fs/promises';
import express from 'express';
import leetcodeStats from '../../Leetcode-Parser/leetcodeStats.js';
import { leetcodeQuery } from '../../Leetcode-Parser/leetcodeParser.js';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';
const projects = {
  'static-landing': '../Landing-Page-Static/index.html',
  'adaptive-landing': '../Landing-Page-Responsive/index.html',
  'colors-game': '../Paired-Colors/index.html',
};

const createLog = (req, res, next) => {
  res.on('finish', function () {
    let isValid;

    if (req.originalUrl.includes('projects')) {
      isValid = Object.keys(projects).some((project) =>
        new RegExp(`^.*${project}.*`).exec(req.originalUrl)
      );
    } else isValid = true;

    if (isValid) console.log(req.method, req.originalUrl, res.statusCode);
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

  app.use(async (req, res, next) => {
    try {
      ///////////////////
      const url = req.originalUrl.replace(base, '');

      if (serverURL.includes(url.split('/')[0])) return next();

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

  app.use(async (req, res, next) => {
    try {
      ///////////////////
      const url = req.originalUrl.replace(base, '');

      if (serverURL.includes(url)) return next();

      const ssrLoader = await import('../dist/server/entry-server.js');
      const rendered = ssrLoader.render({ url, req, ssrManifest });

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

//Public folders of pages
app.use('/projects/static', express.static('../Landing-Page-Static/static'));
app.use(
  '/projects/publicResp',
  express.static('../Landing-Page-Responsive/publicResp')
);
app.use('/projects/distCol', express.static('../Paired-Colors/distCol'));

let leetcodeNodes;
leetcodeQuery()
  .then((stats) => leetcodeStats(stats))
  .then((html) => (leetcodeNodes = html))
  .catch((e) => console.error(e));
app.use('/projects/leetcode', async (req, res) => {
  if (!leetcodeNodes) res.status(102);
  res.status(200).set({ 'Content-Type': 'text/html' }).end(leetcodeNodes);
});

// Non-React queries
app.use('/projects/', async (req, res) => {
  try {
    const page = req.originalUrl.replace('/projects/', '');
    const pathToHTML = projects[page];

    const html = await fs.readFile(pathToHTML, 'utf-8');
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
