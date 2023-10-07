(() => {
  'use strict';
  const nav = document.querySelector('.header__nav');
  const bar = document.querySelector('.header__bar');

  const button = document.querySelector('.header__burger');
  button.addEventListener('click', () => switcher(nav));

  const close = document.querySelector('.header__close');
  close.addEventListener('click', () => switcher(nav));

  const returner = document.querySelector('.header__return');
  returner.addEventListener('click', () => switcher(bar));

  const search = document.querySelector('.header__search');
  search.addEventListener('click', () => switcher(bar));

  const switcher = (el) => {
    el.classList.toggle(`${el.classList[0]}--active`);
  };
})();
