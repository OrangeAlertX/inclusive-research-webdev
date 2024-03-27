import express from 'express';
import fs from 'node:fs/promises';
import leetcodeStats from '../../../Leetcode-Parser/leetcodeStats.js';
import { leetcodeQuery } from '../../../Leetcode-Parser/leetcodeParser.js';

export const projectsRouter = express.Router();

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

// Logger
projectsRouter.use(createLog);

// Static files of pages
projectsRouter.use('/static', express.static('../Landing-Page-Static/static'));
projectsRouter.use(
  '/publicResp',
  express.static('../Landing-Page-Responsive/publicResp')
);
projectsRouter.use('/distCol', express.static('../Paired-Colors/distCol'));

async function returnStatic(res, pathToHTML) {
  try {
    const html = await fs.readFile(pathToHTML, 'utf-8');
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
}
projectsRouter.get('/static-landing', async (req, res) => {
  await returnStatic(res, projects['static-landing']);
});
projectsRouter.get('/adaptive-landing', async (req, res) => {
  await returnStatic(res, projects['adaptive-landing']);
});
projectsRouter.get('/colors-game', async (req, res) => {
  await returnStatic(res, projects['colors-game']);
});
projectsRouter.get('/leetcode', async (req, res) => {
  if (!leetcodeNodes) res.status(102);
  res.status(200).set({ 'Content-Type': 'text/html' }).end(leetcodeNodes);
});

let leetcodeNodes;
leetcodeQuery()
  .then((stats) => leetcodeStats(stats))
  .then((html) => (leetcodeNodes = html))
  .catch((e) => console.error(e));
