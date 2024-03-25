import express from 'express';
import { projectsRouter } from './routes/projects.js';
import { reactRouter } from './routes/react.js';

// Constants
const isNginxHandleStaticPages = process.env.DOCKER_RUNNING == 'true';
const port = process.env.PORT || 5173;

// Create http server
const app = express();

// Static pages
if (!isNginxHandleStaticPages) {
  app.use('/projects', projectsRouter);
}

// Collapse to React
app.use(reactRouter);

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
