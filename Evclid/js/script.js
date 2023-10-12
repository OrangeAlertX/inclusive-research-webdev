// Viewport resize for big monitors //
(() => {
  const viewport = document.querySelector('meta[name="viewport"]');
  const defaultViewport = viewport.getAttribute('content');

  resizer();

  window.addEventListener('resize', resizer);

  function resizer() {
    const viewport = document.querySelector('meta[name="viewport"]');
    const width = window.outerWidth;

    if (width > 2560) {
      viewport.setAttribute(
        'content',
        `width=2560, initial-scale=${width / 2560}`
      );
    } else viewport.setAttribute('content', defaultViewport);
  }
})();

// Header //
(() => {
  'use strict';
  //Active button when input in focus //
  const input = document.querySelector('.header__input');
  const submit = document.querySelector('.header__btn');

  input.addEventListener('focus', () => {
    submit.classList.add('active');
  });

  input.addEventListener('blur', () => {
    submit.classList.remove('active');
  });

  //open-close
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
  search.addEventListener('click', () => {
    switcher(bar);
    input.focus();
  });

  const switcher = (el) => {
    el.classList.toggle(`${el.classList[0]}--active`);
  };
})();

// Section-1-Order
(() => {
  'use strict';
  // download image based on innerWidth
  const images = document.getElementsByClassName('order__img');

  window.addEventListener('resize', initImages);

  initImages();

  function initImages() {
    const width = window.innerWidth;

    for (let i = 0; i < 3; i++) {
      setSrc(images[i], i + 1, width);
    }
  }

  function setSrc(image, i, width) {
    let choice;
    if (width <= 320) {
      choice = '-320';
    } else if (width <= 768) {
      choice = '-768';
    } else if (width <= 1024) {
      choice = '-1024';
    } else {
      choice = '';
    }
    image.setAttribute('src', `images/order/order-${i}${choice}.jpg`);
  }
})();
