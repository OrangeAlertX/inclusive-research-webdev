import puppeteer from 'puppeteer';
import fs from 'fs';

async function parseLeetcodeByPuppeteer() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(`https://leetcode.com/orangealertx`);

  await page.waitForSelector(`.month`);

  const res = await page.evaluate(async () => {
    const solvedProblems = document.querySelector(
      `.flex.w-full.flex-col.space-x-0.space-y-4`
    ).firstChild;
    const activites = document.querySelector(
      `.flex.h-auto.flex-col.space-y-4.p-4.pb-0`
    );
    document.querySelector(`.month`).parentNode.setAttribute('width', '800');
    const lightDarkScript = document.querySelector('#__next>script');

    const stylesLink = document.querySelector('link');
    const href = stylesLink.getAttribute('href');

    const styles = await fetch(`https://leetcode.com/${href}`).then((res) =>
      res.text()
    );

    return {
      data: [
        `<style>${styles}</style>`,
        lightDarkScript.outerHTML,
        solvedProblems.outerHTML,
      ],
      activites: activites.outerHTML,
    };
  });

  browser.close();

  return res;
}

export default async function leetcodeParser() {
  let { data, activites } = await parseLeetcodeByPuppeteer();
  addToDB(block, fixedBlock);
  const html =
    '<head></head>\n' + `<body>${data.join('\n') + activites}</body>`;
  return html;
}

function addToDB(block, fixedBlock) {
  console.log('NOT IMPLEMENTED!');
}
