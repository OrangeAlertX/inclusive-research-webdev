import leetcodeStats from './leetcodeStats.js';
import leetcodeQuery from './utils/leetcodeQuery.js';
import fs from 'fs';

export default function leetcodeUpdateHTML() {
  leetcodeQuery()
    .then((stats) => leetcodeStats(stats))
    .then((html) => {
      fs.writeFile('index.html', html, { flag: 'w+' }, (error) => {
        console.log(error || 'Done.');
      });
    });
}
