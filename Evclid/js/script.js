// (() => {
//   let active = false;

//   window.addEventListener('resize', function () {
//     if (parseInt(window.innerWidth) > 2560) {
//       switchScale();
//       if (active) return;
//       else {
//         switchWidth();
//       }
//     } else if (active) {
//       switchScale((reverse = true));
//       switchWidth('width=2560', 'width=device-width');
//     }

//     function switchScale(reverse = false) {
//       let defaultScale = 'initial-scale=1';

//       let viewport = document.querySelector('meta[name="viewport"]');

//       let a = /\binitial-scale=\w*(?:,|$)/g;
//       let b = reverse
//         ? defaultScale
//         : `initial-scale=${window.innerWidth / 2560}`;
//       console.log(a, b);
//       let content = viewport.getAttribute('content').replace(a, b);
//       viewport.setAttribute('content', content);
//     }

//     function switchWidth(a = 'width=device-width', b = 'width=2560') {
//       active = !active;
//       console.log('switchWidth');

//       let viewport = document.querySelector('meta[name="viewport"]');

//       let content = viewport.getAttribute('content').replace(a, b);
//       viewport.setAttribute('content', content);
//     }
//   });
// })();

// Header //
(() => {
  'use strict';
  const nav = document.querySelector('.header__nav');
  const bar = document.querySelector('.header__bar');

  const button = document.querySelector('.header__burger');
  button.addEventListener('click', () => switcher(nav));

  const close = document.querySelector('.header__close');
  close.addEventListener('click', () => switcher(nav));

  const returner = document.querySelector('.header__return');
  returner.addEventListener('click', (e) => {
    e.preventDefault();
    switcher(bar);
  });

  const search = document.querySelector('.header__search');
  search.addEventListener('click', () => switcher(bar));

  const switcher = (el) => {
    el.classList.toggle(`${el.classList[0]}--active`);
  };
})();
