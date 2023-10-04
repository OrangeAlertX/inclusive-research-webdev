import { newElem } from './game-tools.mjs';

const createEasyGame = (playground) => {
  const qtEasyCards = 16;
  const bunchSize = 2;
  const grid = newElem('div', 'grid');
  const cards = createCards(qtEasyCards, bunchSize);
  grid.append(...cards);
  playground.append(grid);
  initFlipEvents(grid, bunchSize);
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
    card.bunchID = `bunch${i + 1}`;
    cards.push(card);
    for (let i = 1; i < bunchSize; i++) {
      const cardCopy = card.cloneNode(true);
      cards.push(cardCopy);
    }
  }

  return cards;
};

const initFlipEvents = (grid, bunchSize) => {
  const cards = grid.children;
  grid.memory = [];
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    console.log(card.addEventListener);
    card.addEventListener('click', () => console.log('click'));
  }
};

const actionFlipCard = function (e) {
  console.log(this);

  flipTheCard(card);
  if (grid.memory.length) cardsMatching(grid.memory, card);
  else grid.memory.push(card);
  if (grid.memory.length === bunchSize) acceptCards(grid.memory);
};

const flipTheCard = (card) =>
  (card.children[0].style.transform = card.children[0].style.transform
    ? ''
    : 'rotateY(180deg)');
const cardsMatching = (memory, card) => {
  for (const cardM of memory) {
    if (cardM.cardID !== card.cardID) {
      clearGridMemory(grid.memory);
      return;
    }
  }
  memory.push(e);
};
const clearGridMemory = (memory) => {
  for (const cardM of memory) {
    flipTheCard(cardM);
  }
  memory.length = 0;
};
const acceptCards = (memory) => {
  for (const cardM of memory) {
    cardM.style.visibility = 'hidden';
  }
  memory.length = 0;
};

export { createEasyGame };
