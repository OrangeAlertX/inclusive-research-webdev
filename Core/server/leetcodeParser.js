import { parse } from 'node-html-parser';

async function parseLeetcode() {
  return await fetch(`https://leetcode.com/orangealertx/`)
    .then((res) => res.text())
    .then(async (document) => {
      const root = parse(document);

      const solvedProblems = root.querySelector(
        `.flex.w-full.flex-col.space-x-0.space-y-4`
      ).firstChild;
      const activites = root.querySelector(
        '.flex.h-auto.flex-col.space-y-4.p-4.pb-0'
      );
      console.log({ solvedProblems, activites });

      const stylesStylesheets = root.querySelectorAll("link[rel='stylesheet']");
      const stylesLink = stylesStylesheets.map(
        (el) => 'https://leetcode.com' + el.getAttribute('href')
      );

      const stylesPromises = [];
      stylesLink.forEach(
        (el, i) => (stylesPromises[i] = fetch(el).then((style) => style.text()))
      );

      const styles = await Promise.all(stylesPromises);

      return [solvedProblems, activites, styles];
    });
}

export default async function leetcodeParser() {
  const [solvedProblems, activites, styles] = await parseLeetcode();

  const stylesText = styles.join('\n');
  const solvedProblemsText = solvedProblems.outerHTML;
  const activitesText = activites.outerHTML;

  return JSON.stringify({
    styles: stylesText,
    solvedProblems: solvedProblemsText,
    activites: activitesText,
  });
}
