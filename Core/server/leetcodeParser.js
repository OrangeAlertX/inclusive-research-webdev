import { parse } from 'node-html-parser';

export default async function leetcodeParser() {
  return await fetch(`https://leetcode.com/orangealertx/`)
    .then((res) => res.text())
    .then(async (document) => {
      const root = parse(document);

      const leetcode = root.querySelector(
        `.flex.w-full.flex-col.space-x-0.space-y-4`
      );

      const components = leetcode.parentNode.childNodes;

      const stylesStylesheets = root.querySelectorAll("link[rel='stylesheet']");
      const stylesLink = stylesStylesheets.map(
        (el) => 'https://leetcode.com' + el.getAttribute('href')
      );

      const stylesPromises = [];
      stylesLink.forEach(
        (el, i) => (stylesPromises[i] = fetch(el).then((style) => style.text()))
      );

      const styles = Promise.all(stylesPromises);

      return [components.slice(0, 2), styles];
    });
}
