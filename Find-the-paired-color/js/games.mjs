import newElem from './game-tools.mjs';

const createGame = (e, playground, qtCards, bunchSize) => {
  const grid = newElem('div', 'grid');
  const cards = createCards(qtCards, bunchSize);
  grid.append(...cards);
  playground.innerHTML = '';
  playground.append(grid);
  changeOrder(grid);
  // setGridSizes(grid, qtCards);
  initFlipEvents(grid, bunchSize);

  const root = document.querySelector(':root');
  root.style.setProperty(
    '--currentDifficulty',
    window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue('background-color')
  );
};

const createCards = (qt, bunchSize) => {
  const cards = [];
  const bunches = parseInt(qt / bunchSize);

  for (let i = 0; i < bunches; i++) {
    const card = newElem('div', 'card');
    const cardBody = newElem('div', 'cardBody');
    const cardFace = newElem('div', 'cardFace');
    const cardBack = newElem('div', 'cardBack');
    card.append(cardBody);
    cardBody.append(cardFace, cardBack);
    card.setAttribute('bunchID', `bunch${i + 1}`);
    cardBack.textContent = `${i}`;
    cardBack.style.backgroundColor = `rgb(${getColor()},${getColor()},${getColor()})`;
    cards.push(card);
    for (let i = 1; i < bunchSize; i++) {
      const cardCopy = card.cloneNode(true);
      cards.push(cardCopy);
    }
  }

  return cards;
};

const getColor = () => Math.floor(Math.random() * 256);
const initFlipEvents = (grid, bunchSize) => {
  const cards = grid.children;
  const memory = [];
  grid.setAttribute('counter', grid.children.length);
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.addEventListener('click', () =>
      actionFlipCard(card, bunchSize, memory)
    );
  }
};

const actionFlipCard = (card, bunchSize, memory) => {
  if (!flipTheCard(card, memory)) return;
  memory.push(card);

  cardsMatching(memory, card);
  if (memory.length === bunchSize) acceptCards(memory, card);
};

const flipTheCard = (card, memory) => {
  if (card.children[0].style.transform) {
    memory.splice(0, memory.length, ...memory.filter((elem) => card !== elem));
    card.children[0].style.transform = '';
    return false;
  } else card.children[0].style.transform = 'rotateY(180deg)';

  return true;
};

const cardsMatching = (memory, card) => {
  for (const cardM of memory) {
    if (cardM.getAttribute('bunchID') !== card.getAttribute('bunchID')) {
      clearGridMemory(memory, card.parentElement);
    }
  }
};
const clearGridMemory = (memory, grid) => {
  const remain = memory[memory.length - 1];
  for (const cardM of memory) {
    flipTheCard(cardM, memory);
  }
  memory.length = 0;
  for (const card of grid.children) {
    if (card.children[0].style.transform) card.children[0].style.transform = '';
  }
  remain.click();
};
const acceptCards = (memory) => {
  for (const cardM of memory) {
    setTimeout(() => {
      cardM.style.visibility = 'hidden';
    }, 1000);
  }

  const grid = memory[0].parentElement;

  const cur = parseInt(grid.getAttribute('counter'));
  if (cur <= memory.length) {
    for (const cardM of memory) {
      setTimeout(() => flipTheCard(cardM, memory), 1001);
    }
    setTimeout(() => {
      actionWinGame(grid);
    }, 1500);
  } else grid.setAttribute('counter', cur - memory.length);

  memory.length = 0;
};

const changeOrder = (grid) => {
  for (const card of grid.children) {
    card.style.order = `${parseInt(Math.random() * 100)}`;
  }
};

const actionWinGame = (grid) => {
  Array.from(grid.children).forEach((card, i) =>
    setTimeout(() => {
      card.style.visibility = 'visible';
      card.children[0].style.transform = 'rotateY(180deg)';
    }, 100 * i)
  );
};

const setGridSizes = (grid, qt) => {
  const sizes = { 8: 4, 12: 3, 18: 6, 24: 6, 32: 8, 30: 10 };
  let columns = sizes[qt];
  if (!columns) columns = 8;

  grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
};

export default createGame;
