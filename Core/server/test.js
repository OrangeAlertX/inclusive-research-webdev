import { JSDOM } from 'jsdom';

const component = `<!DOCTYPE html><head><style>.red{display:flex; font-size: 48px;}</style>
  <script>
  window.addEventListener('DOMContentLoaded', ()=> {
  const elem = document.getElementsByTagName('div')[0];
  elem.className = 'red';
  })
  </script>
  </head><body><div>I am div</div></body>`;

const DOM = new JSDOM(component, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: `https://leetcode.com/orangealertx/`,
});

const document = DOM.window.document;

const elem = document.getElementsByTagName(`div`)[0];
const styles = DOM.window.getComputedStyle(elem);

console.log(DOM.window.getComputedStyle(elem)['_values']);
setInterval(() => console.log(DOM.serialize()), 2000);
