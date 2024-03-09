import puppeteer from 'puppeteer';

async function parseLeetcode() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(`https://leetcode.com/orangealertx`);

  await page.waitForSelector(`.month`);

  const res = await page.evaluate(() => {
    const solvedProblems = document.querySelector(
      `.flex.w-full.flex-col.space-x-0.space-y-4`
    ).firstChild;
    const solvedProblemsStyle = window.getComputedStyle(solvedProblems).cssText;

    const activites = document.querySelector(
      `.flex.h-auto.flex-col.space-y-4.p-4.pb-0`
    );
    const activitesStyle = window.getComputedStyle(activites).cssText;
    document.querySelector(`.month`).parentNode.setAttribute('width', '800');

    const lightDarkScript = document.querySelector('#__next>script');

    return {
      solvedProblems: solvedProblems.outerHTML,
      solvedProblemsStyle,
      activites: activites.outerHTML,
      activitesStyle,
      lightDarkScript: lightDarkScript.outerHTML,
    };
  });

  console.log(res);
  browser.close();
  return res;
}

export default async function leetcodeParser() {
  const { solvedProblems, solvedProblemsStyle, activites, activitesStyle } =
    await parseLeetcode();
}

parseLeetcode();
