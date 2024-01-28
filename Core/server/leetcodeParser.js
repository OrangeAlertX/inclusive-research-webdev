import { JSDOM } from 'jsdom';

async function parseLeetcode() {
  const leetcode = await fetch(`https://leetcode.com/orangealertx`)
    .then((res) => res.text())
    .then((text) =>
      text.replace(
        `<script>`,
        `<script>window.matchMedia = window.matchMedia || (() => { return { matches: false, addListener: () => {}, removeListener: () => {}, }; });</script>
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
      }());</script>
        <script>`
      )
    );

  const DOM = new JSDOM(leetcode, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: `https://leetcode.com/orangealertx/`,
  });

  const document = DOM.window.document;

  const solvedProblems = document.querySelector(
    `.flex.w-full.flex-col.space-x-0.space-y-4`
  ).firstChild;

  const activites = new Promise((res) => {
    const interval = setInterval(() => {
      console.log('check');
      const cur = document.querySelector(
        `.flex.h-auto.flex-col.space-y-4.p-4.pb-0`
      );
      if (!cur) return; //waiting until the component fully mounted
      if (document.querySelector(`.month`)) {
        console.log(
          document
            .querySelector(`.month`)
            .parentNode.setAttribute('width', '800')
        );

        DOM.window.close();
        clearInterval(interval);
        res(cur);
      }

      // applyStyles([cur], DOM.window);
    }, 3000);
  });

  const stylesStylesheets = document.querySelectorAll("link[rel='stylesheet']");
  const stylesLink = Array.from(stylesStylesheets).map(
    (el) => 'https://leetcode.com' + el.getAttribute('href')
  );
  const stylesPromises = [];
  stylesLink.forEach(
    (el, i) => (stylesPromises[i] = fetch(el).then((style) => style.text()))
  );
  const styles = Promise.all(stylesPromises);

  return [solvedProblems, await activites, await styles];
}

// function applyStyles(nodes, window) {
//   for (let i = 0; i < nodes.length; i++) {
//     const styles = window.getComputedStyle(nodes[i]);
//     const stylesInline = new Array(styles.length);

//     for (let j = 0; j < styles.length; j++) {

//     }

//     nodes[i].setAttribute('style', stylesInline.join());
//     applyStyles(nodes[i].children, window);
//   }
// }

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
