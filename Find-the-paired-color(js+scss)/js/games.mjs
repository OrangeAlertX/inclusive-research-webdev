import { newElem } from './game-tools.mjs';

const easyCards = 16;

const createEasyGame = () => {
  const grid = newElem('div', 'grid');
  const cards = createCards(16);
  grid.append(...cards);

  return grid;
};

const createCards = (qt, bunchSize = 2) => {
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

export { createEasyGame };
