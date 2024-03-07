import { JSDOM, VirtualConsole } from 'jsdom';

async function parseLeetcode() {
  const [leetcode, externalStyles] = await fetch(
    `https://leetcode.com/orangealertx`
  )
    .then((res) => res.text())
    .then(async (text) => {
      //Extract CSS
      const pattern = /<link\s+rel="stylesheet"\s+href="([^"]*)"([^>]*)>/g;
      let matches = matches = pattern.exec(text);
      let linkCss = matches[0];

      let externalStyles = await fetch(
        `https://leetcode.com/${linkCss.split('"')[3]}`
      ).then((res) => res.text());
      text = text.replace(linkCss, '');

      //Fix JSDOM bugs
      return [
        text.replace(
          `</noscript>`,
          `</noscript><script>window.matchMedia = window.matchMedia || (() => { return { matches: false, addListener: () => {}, removeListener: () => {}, }; });</script>
      <script>(function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());</script>`
        ),
        externalStyles,
      ];
    });

  const virtualConsole = new VirtualConsole();
  virtualConsole.on('*', (text) => {});

  const DOM = new JSDOM(leetcode, {
    virtualConsole,
    runScripts: 'dangerously',
    resources: 'usable',
    url: `https://leetcode.com/orangealertx/`,
    pretendToBeVisual: true,
  });

  const window = DOM.window;
  const document = window.document;

  const solvedProblems = new Promise((res) => {
    const interval = setInterval(() => {
      const curNode = document.querySelector(
        `.flex.w-full.flex-col.space-x-0.space-y-4`
      ).firstChild;
      if (!curNode) return; //waiting until the component was mounted

      clearInterval(interval);
      res(curNode);
    }, 3000);
  });

  const activites = new Promise((res) => {
    const interval = setInterval(() => {
      const curNode = document.querySelector(
        `.flex.h-auto.flex-col.space-y-4.p-4.pb-0`
      );
      if (!curNode) return; //waiting until the component was mounted
      if (document.querySelector(`.month`)) {
        document
          .querySelector(`.month`)
          .parentNode.setAttribute('width', '800');

        clearInterval(interval);

        res(curNode);
      }
    }, 3000);
  });

  return [await solvedProblems, await activites, DOM, externalStyles];
}

export default async function leetcodeParser() {
  const [solvedProblems, activites, DOM, styles] = await parseLeetcode();

  const solvedProblemsText = solvedProblems.outerHTML;
  const activitesText = activites.outerHTML;
  const lightDarkScript = DOM.window.document.querySelector('#__next>script');

  DOM.window.document.head.innerHTML = `<style>${styles}</style><script>${lightDarkScript.innerHTML}</script>`;
  DOM.window.document.body.innerHTML = `<div style="display: flex; flex-direction: column;">${
    solvedProblemsText + activitesText
  }</div>`;

  const leetcode = DOM.serialize();
  DOM.window.close();

  return leetcode;
}
