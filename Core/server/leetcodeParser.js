import { JSDOM, VirtualConsole } from 'jsdom';
import http from 'http';

async function parseLeetcode() {
  const leetcode = await fetch(`https://leetcode.com/orangealertx`)
    .then((res) => res.text())
    .then((text) => {
      return text.replace(
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
            window.requestAnimationFrame = function(callback, element) {
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
      );
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

  // setTimeout(() => {
  //   http
  //     .createServer(function (req, res) {
  //       res.write(DOM.serialize()); //write a response to the client
  //       res.end(); //end the response
  //     })
  //     .listen(8080);
  // }, 20000);

  const window = DOM.window;
  const document = window.document;

  const solvedProblems = new Promise((res) => {
    const interval = setInterval(() => {
      const cur = document.querySelector(
        `.flex.w-full.flex-col.space-x-0.space-y-4`
      ).firstChild;
      if (!cur) return; //waiting until the component was mounted

      clearInterval(interval);
      applyStyles([cur], DOM.window);
      res(cur);
    }, 3000);
  });

  const activites = new Promise((res) => {
    const interval = setInterval(() => {
      const cur = document.querySelector(
        `.flex.h-auto.flex-col.space-y-4.p-4.pb-0`
      );
      if (!cur) return; //waiting until the component was mounted
      if (document.querySelector(`.month`)) {
        document
          .querySelector(`.month`)
          .parentNode.setAttribute('width', '800');

        clearInterval(interval);
        setTimeout(() => {
          // console.log(window.document.styleSheets[0].); //.medal_gradient-text__i7EDx
          applyStyles([cur], window);
          window.close();
          res(cur);
        }, 30000);
      }
    }, 3000);
  });

  // const stylesStylesheets = document.querySelectorAll("link[rel='stylesheet']");
  // const stylesLink = Array.from(stylesStylesheets).map(
  //   (el) => 'https://leetcode.com' + el.getAttribute('href')
  // );
  // const stylesPromises = [];
  // stylesLink.forEach(
  //   (el, i) => (stylesPromises[i] = fetch(el).then((style) => style.text()))
  // );
  // const styles = await Promise.all(stylesPromises);

  return [await solvedProblems, await activites, 'styles'];
}

function applyStyles(nodes, window) {
  for (let i = 0; i < nodes.length; i++) {
    const styles = window.getComputedStyle(nodes[i]);
    nodes[i].setAttribute(
      'style',
      JSON.stringify(styles['_values'])
        .split('","')
        .join(';')
        .replaceAll('"', '')
        .slice(1, -1)
    );
    applyStyles(nodes[i].children, window);
  }
}

export default async function leetcodeParser() {
  const [solvedProblems, activites, styles] = await parseLeetcode();

  // const stylesText = styles.join('\n');
  const solvedProblemsText = solvedProblems.outerHTML;
  const activitesText = activites.outerHTML;

  return JSON.stringify({
    styles: 'stylesText',
    solvedProblems: solvedProblemsText,
    activites: activitesText,
  });
}
