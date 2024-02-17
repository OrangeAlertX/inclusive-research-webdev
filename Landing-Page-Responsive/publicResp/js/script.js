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
  button.addEventListener('click', () => toggle(nav));

  const close = document.querySelector('.header__close');
  close.addEventListener('click', () => toggle(nav));

  const returner = document.querySelector('.header__return');
  returner.addEventListener('click', (e) => {
    e.preventDefault();
    toggle(bar);
  });

  const search = document.querySelector('.header__search');
  search.addEventListener('click', () => {
    toggle(bar);
    input.focus();
  });

  const toggle = (el) => {
    el.classList.toggle(`${el.classList[0]}--active`);
  };
})();

// Section-1-Order
(() => {
  'use strict';
  // download image based on innerWidth
  const images = document.getElementsByClassName('order__img');
  addImgResizer(images, 'order');
})();

// Section-3-details
(() => {
  'use strict';

  const buttons = [...document.querySelectorAll('.details__item')];
  const left = [...document.querySelectorAll('.details__leftchange')];
  const right = [...document.querySelectorAll('.details__rightchange')];

  buttons.forEach((button, i) =>
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('details__item--active'));
      button.classList.add('details__item--active');
      disableAll(left);
      disableAll(right);
      left[i].classList.remove('disable');
      right[i].classList.remove('disable');
    })
  );

  function disableAll(elements) {
    elements.forEach((element) => element.classList.add('disable'));
  }
  //download images
  const images = document.querySelectorAll('.details__rightchange > img');
  addImgResizer(images, 'details');
})();

function addImgResizer(images, folderName) {
  window.addEventListener('resize', initImages);

  initImages();

  function initImages() {
    const width = window.innerWidth;

    for (let i = 0; i < images.length; i++) {
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
    image.setAttribute(
      'src',
      `publicResp/images/${folderName}/${folderName}-${i}${choice}.jpg`
    );
  }
}
