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
  const { data, activites } = leetcode;

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
    data[2] = data[2].replace(key, value);
  }

  data[2] = data[2]
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
  const content = `
    export default function leetcodeStats(stats) { 
      const styleAndScript = \`${escape(data[0]) + escape(data[1])}\`;
      const statistic = \`${escape(data[2])}\`;
      const activites = \`${escape(activites)}\`;

      const html = \`<!doctype html>\\n<head>\${styleAndScript}</head>\\n' + <body>\${statistic + activites}</body>\`;
      
      return html;
    }`;

  fs.writeFile('leetcodeStats.js', content, { flag: 'w+' }, (error) => {
    console.log(error || 'Done.');
  });
}
