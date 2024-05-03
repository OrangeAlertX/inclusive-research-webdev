import express from 'express';
import { reactRouter } from './routes/react.js';
import getPrivateIP from './utils/getPrivateIP.js';

// Constants
const isNginxHandleStaticPages = process.env.DOCKER_RUNNING == 'true';
const port = process.env.PORT || 5173;
const BASE = (process.env.BASE ?? '') + '/';

// Create http server
const app = express();

// Collapse to React
app.use(BASE, reactRouter);

// Start http server
app.listen(port, async () => {
  const ip = await getPrivateIP(192);
  console.log(
    `Server started at ${
      isNginxHandleStaticPages
        ? `http://${ip}${BASE}`
        : `http://${ip}:${port}${BASE}`
    }`
  );
});
