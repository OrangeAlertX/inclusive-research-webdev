// import { JSDOM, VirtualConsole } from 'jsdom';
// Not working anymore because of cloudflare.
/* Its better, than puppeteer, 
because use already installed nodeJS instead of browser 
it will be there for reference*/

async function parseLeetcode() {
  const leetcode = await fetch(`https://leetcode.com/orangealertx`)
    .then((res) => res.text())
    .then((text) => quickFixOfJSDOM(text));

  const DOM = new JSDOM(leetcode, {
    virtualConsole: new VirtualConsole().on('*', (text) => {}),
    runScripts: 'dangerously',
    resources: 'usable',
    url: `https://leetcode.com/orangealertx/`,
    pretendToBeVisual: true,
  });
  const window = DOM.window;
  const document = window.document;

  const solvedProblems = await waitBySetInterval(() => {
    const curNode = document.querySelector(
      `.flex.w-full.flex-col.space-x-0.space-y-4`
    )?.firstChild;
    return curNode;
  });

  const activites = await waitBySetInterval(() => {
    const curNode = document.querySelector(
      `.flex.h-auto.flex-col.space-y-4.p-4.pb-0`
    );
    if (!curNode) return; //waiting until the component was mounted
    if (document.querySelector(`.month`)) {
      document.querySelector(`.month`).parentNode.setAttribute('width', '800');
      return curNode;
    }
  });

  const externalStyles = await waitBySetInterval(async () => {
    const stylesLink = document.querySelector('link');
    const href = stylesLink.getAttribute('href');

    if (href) {
      return await fetch(`https://leetcode.com/${href}`).then((res) =>
        res.text()
      );
    }
  });

  return { solvedProblems, activites, DOM, externalStyles };
}

async function waitBySetInterval(cb, time) {
  return new Promise((res) => {
    const interval = setInterval(() => {
      const isFinished = cb();
      if (!isFinished) return;

      clearInterval(interval);
      res(isFinished);
    }, 3000);
  });
}

function quickFixOfJSDOM(text) {
  return text.replace(
    `</title>`,
    `</title><script>window.matchMedia = window.matchMedia || (() => { return { matches: false, addListener: () => {}, removeListener: () => {}, }; });</script>
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
  );
}
