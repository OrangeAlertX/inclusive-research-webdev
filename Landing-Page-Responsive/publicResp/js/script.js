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
  //open-close
  const nav = document.querySelector('.header__nav');
  const bar = document.querySelector('.header__bar');

  /// Navigation Burger
  const button = document.querySelector('.header__burger');
  button.addEventListener('click', () => toggle(nav));

  const close = document.querySelector('.header__close');
  close.addEventListener('click', () => toggle(nav));

  nav.addEventListener('click', (e) => {
    const link = e.target;
    if (link.tagName === 'A') {
      nav.classList.remove('header__nav--active');
    }
  });

  /// Search Bar
  const returner = document.querySelector('.header__return');
  returner.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
    input.focus();
  });

  const search = document.querySelector('.header__search');
  search.addEventListener('click', () => {
    toggle(bar);
    input.focus();
    setTimeout(() => {
      window.addEventListener('click', closeBarCB);
    }, 0);
  });

  const closeBarCB = (e) => {
    console.log('check');
    const isBarClicked = e.target.closest('.header__bar');

    if (!isBarClicked) {
      bar.classList.remove('header__bar--active');
      window.removeEventListener('click', closeBarCB);
    }
  };

  const toggle = (el) => {
    el.classList.toggle(`${el.classList[0]}--active`);
  };

  //Active button when input in focus //
  const input = document.querySelector('.header__input');
  const submit = document.querySelector('.header__btn');

  input.addEventListener('focus', () => {
    submit.classList.add('header__btn--active');
  });

  input.addEventListener('blur', () => {
    submit.classList.remove('header__btn--active');
  });
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

  const container = document.querySelector('.details');
  const buttons = [...container.querySelectorAll('.details__item')];
  const left = [...container.querySelectorAll('.details__leftchange')];
  const right = [...container.querySelectorAll('.details__rightchange')];

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

const MOD = 1.5;
const MAX_TIME_TRANSITION = 1000;
function accordionOnClick(e) {
  const button = e.currentTarget;
  const textContainer = button.parentNode.querySelector(
    '.questions__textcontainer'
  );
  const svg = button.querySelector('.questions__svg');

  const trueHeight =
    textContainer.querySelector('.questions__text').offsetHeight;

  const isOpening = textContainer.offsetHeight === 0;
  const inlineTransition = textContainer.style.getPropertyValue('transition');
  if (!inlineTransition) {
    textContainer.style.setProperty(
      'transition',
      `max-height ${trueHeight * MOD}ms linear`
    );
  }

  if (isOpening) {
    svg.classList.add('questions__svg--active');
    textContainer.style.setProperty('max-height', trueHeight + 'px');
  } else {
    svg.classList.remove('questions__svg--active');
    textContainer.style.setProperty('max-height', 0 + 'px');
  }
}
