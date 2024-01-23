import { parse } from 'node-html-parser';

export default async function leetcodeParser(path) {
  fetch(`https://leetcode.com/orangealertx/`)
    .then((res) => res.text())
    .then((document) => {
      const root = parse(document);

      const leetcode = root.querySelector(
        `.flex.w-full.flex-col.space-x-0.space-y-4`
      );
      console.log(leetcode);
    });

  // console.log(document.head);
}
