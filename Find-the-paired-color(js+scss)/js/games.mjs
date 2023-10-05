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
    card.setAttribute('bunchID', `bunch${i + 1}`);
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
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.addEventListener('click', () =>
      actionFlipCard(card, bunchSize, memory)
    );
  }
};

const actionFlipCard = (card, bunchSize, memory) => {
  console.log(memory);
  if (!flipTheCard(card, memory)) return;
  memory.push(card);

  cardsMatching(memory, card);
  if (memory.length === bunchSize) acceptCards(memory);
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
      clearGridMemory(memory, card.parentElement); //setTimeout
    }
  }
};
const clearGridMemory = (memory, grid) => {
  for (const cardM of memory) {
    flipTheCard(cardM, memory);
  }
  memory.length = 0;
  for (const card of grid.children) {
    if (card.children[0].style.transform) card.children[0].style.transform = '';
  }
};
const acceptCards = (memory) => {
  for (const cardM of memory) {
    cardM.style.visibility = 'hidden';
  }
  memory.length = 0;
};

export { createEasyGame };
