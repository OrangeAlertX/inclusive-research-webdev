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

    const stylesLink = document.querySelector('link');
    const href = stylesLink.getAttribute('href');

    const styles = await fetch(`https://leetcode.com/${href}`).then((res) =>
      res.text()
    );

    return {
      data: [`<style>${styles}</style>`, solvedProblems.outerHTML],
    };
  });

  browser.close();

  return res;
}

export default async function leetcodeParser() {
  let data = await parseLeetcodeByPuppeteer();

  createTemplate(data);
}

export async function leetcodeQuery() {
  const {
    totalSolved,
    totalQuestions,
    easySolved,
    totalEasy,
    mediumSolved,
    totalMedium,
    hardSolved,
    totalHard,
  } = await fetch('https://leetcodestats.cyclic.app/orangealertx')
    .then((res) => res.text())
    .then((json) => JSON.parse(json));

  const totalPercentOf285 = ((totalSolved / totalQuestions) * 285).toFixed(1);
  const easyPercent = ((easySolved / totalEasy) * 100).toFixed(4);
  const mediumPercent = ((mediumSolved / totalMedium) * 100).toFixed(4);
  const hardPercent = ((hardSolved / totalHard) * 100).toFixed(4);

  return {
    totalSolved,
    easySolved,
    totalEasy,
    mediumSolved,
    totalMedium,
    hardSolved,
    totalHard,
    totalPercentOf285,
    easyPercent,
    mediumPercent,
    hardPercent,
  };
}

async function createTemplate(leetcode) {
  const { data } = leetcode;

  const stats = await leetcodeQuery();

  const valuesToChange = {
    [`>${stats.totalSolved}<`]: '>${stats.totalSolved}<',
    [`>${stats.easySolved}<`]: '>${stats.easySolved}<',
    [`>${stats.mediumSolved}<`]: '>${stats.mediumSolved}<',
    [`>${stats.hardSolved}<`]: '>${stats.hardSolved}<',
    [`>/${stats.totalEasy}<`]: '>/${stats.totalEasy}<',
    [`>/${stats.totalMedium}<`]: '>/${stats.totalMedium}<',
    [`>/${stats.totalHard}<`]: '>/${stats.totalHard}<',
  };

  for (let [key, value] of Object.entries(valuesToChange)) {
    data[1] = data[1].replace(key, value);
  }

  data[1] = data[1]
    .replace(/style="width: *([\d.]+)%/g, (cur) => {
      const curPercent = Math.round(Number(cur.replace(/[^\d\.]*/g, '')));

      switch (curPercent) {
        case Math.round(stats.easyPercent):
          return 'style="width: ${stats.easyPercent}%';
        case Math.round(stats.mediumPercent):
          return 'style="width: ${stats.mediumPercent}%';
        default:
          return 'style="width: ${stats.hardPercent}%';
      }
    })
    .replace(
      /stroke-dasharray="*([\d.]+)/,
      'stroke-dasharray="${stats.totalPercentOf285}'
    );

  const escape = (text) => text.replace(/[\\]/g, '\\$&');
  const content = `import { activities } from './activities.js';
    export default function leetcodeStats(stats) { 
      const style = \`${escape(data[0])}\`;
      const statistic = \`${escape(data[1])}\`;

      const html = \`<!doctype html>\\n<head>\${style}</head>\\n<body>\${statistic + activities}</body>\`;
      
      return html;
    }`;

  fs.writeFile('leetcodeStats.js', content, { flag: 'w+' }, (error) => {
    console.log(error || 'Done.');
  });
}
