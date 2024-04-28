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
  // Buttons
  const clearInput = document.querySelector('.header__return');
  clearInput.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value === '') {
      bar.classList.remove('header__bar--active');
      window.removeEventListener('click', closeBarCB);
      return;
    }
    input.value = '';
    clearInput.classList.add('header__return--disable');
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

  // Opacity deleter of the input text when no value
  clearInput.classList.add('header__return--disable');
  input.addEventListener('input', () => {
    const newValue = input.value;

    if (newValue === '') {
      clearInput.classList.add('header__return--disable');
      return;
    }

    if (clearInput.classList.contains('header__return--disable')) {
      clearInput.classList.remove('header__return--disable');
    }
  });

  // Header hidden when scrolldown
  const header = document.querySelector('.header__fixed');

  let scrollPrev = 0;
  window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;

    if (scrolled > 100 && scrolled > scrollPrev) {
      header.classList.add('header__fixed--hidden');
    } else {
      header.classList.remove('header__fixed--hidden');
    }

    scrollPrev = scrolled;
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

//onclick function for the section#4
const MOD = 1.5;
const MAX_TIME_TRANSITION = 1000;
const getTopBottomMarginsOf = (el) => {
  const styles = window.getComputedStyle(el);
  return parseInt(styles.marginTop) + parseInt(styles.marginBottom);
};

let textWidth = [];
function accordionOnClick(e) {
  const button = e.currentTarget;
  const textContainer = button.parentNode.querySelector(
    '.questions__textcontainer'
  );
  const index = [...button.parentNode.parentNode.children].indexOf(
    button.parentNode
  );
  const svg = button.querySelector('.questions__svg');
  const text = textContainer.querySelector('.questions__text');

  const trueHeight = text.offsetHeight + getTopBottomMarginsOf(text);

  const isOpening = textContainer.offsetHeight === 0;
  if (textWidth[index] !== text.offsetWidth) {
    textContainer.style.setProperty(
      'transition',
      `max-height ${trueHeight * MOD}ms linear`
    );
    textWidth[index] = text.offsetWidth;
  }

  if (isOpening) {
    svg.classList.add('questions__svg--active');
    textContainer.style.setProperty('max-height', trueHeight + 'px');
  } else {
    svg.classList.remove('questions__svg--active');
    textContainer.style.setProperty('max-height', 0 + 'px');
  }
}

//onclick function for link to anchor without changing browser navbar
function gotoID(targetID) {
  const target = document.getElementById(targetID);
  target.scrollIntoView();
}
