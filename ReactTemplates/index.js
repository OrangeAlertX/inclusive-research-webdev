#!/usr/bin/env node

import ncp from 'ncp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const target = './';

ncp(
  path.resolve(__dirname, './ReactTemplateVite'),
  path.resolve(process.cwd(), target),
  {
    stopOnErr: true,
    filter: (filePath) => {
      const file = filePath.split('/').at(-1);
      if (file === 'node_modules' || file === 'dist') return false;

      return true;
    },
  },
  (error) => {
    if (error) console.log(error);
    else console.log('done!');
  }
);
