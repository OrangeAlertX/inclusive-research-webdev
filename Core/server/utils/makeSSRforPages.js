import fs from 'node:fs/promises';
import { render as ssrLoader } from '../../dist/server/entry-server.js';

export default function makeSSRforPages(req) {
  fs.readFile('./dist/client/index.html', 'utf-8').then((templateHTML) => {
    const rendered = ssrLoader({ req });
    const html = templateHTML
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html);

    fs.writeFile(
      './dist/client/index.html',
      html,
      { encoding: 'utf-8', flag: 'w+' },
      (error) => {
        console.log(error || 'Done.');
      }
    );
  });
}
