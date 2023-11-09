let counter;
let bunchSize;
const memory = [];

function createActions(grid, bS) {
  const cards = grid.children;
  counter = cards.length;
  bunchSize = bS;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('click', () => actionFlipCard(card));
  }
}

const actionFlipCard = (card) => {
  const isAlreadyFlipped = flipTheCard(card);
  if (isAlreadyFlipped) return;

  memory.push(card);
  if (cardsMatching(card) && memory.length === bunchSize)
    acceptCards(memory, card);
};

const cardsMatching = (card) => {
  memory.forEach((cardM) => {
    const isNotTheSameCards =
      cardM.getAttribute('bunchID') !== card.getAttribute('bunchID');

    if (isNotTheSameCards) {
      clearGridMemory(card.parentElement);
      return false;
    }
  });

  return true;
};

const clearGridMemory = (grid) => {
  const remain = memory.at(-1);
  for (let i = 0; i < memory.length - 1; i++) {
    const cardM = memory[i];
    flipTheCard(cardM);
  }

  memory.length = 0;
  // for (const card of grid.children) {
  //   if (card.children[0].style.transform) card.children[0].style.transform = '';
  // }
  memory.push(remain);
};

const acceptCards = (memory) => {
  memory.forEach((cardM) => {
    setTimeout(() => {
      cardM.style.setProperty('visibility', 'hidden');
    }, 1000);
  });

  const grid = memory[0].parentElement;

  if (counter === memory.length) {
    setTimeout(() => {
      actionWinGame(grid);
    }, 1500);
  } else counter -= memory.length;

  memory.length = 0;
};

const actionWinGame = (grid) => {
  const cards = Array.from(grid.children);
  cards.forEach((card, i) => {
    const cardBodyStyle = card.children[0].style;
    backFlip(cardBodyStyle);

    setTimeout(() => {
      card.style.setProperty('visibility', 'visible');
      forwardFlip(cardBodyStyle);
    }, 100 * i);
  });
};

const flipTheCard = (card) => {
  const cardBodyStyle = card.children[0].style;
  const isAlreadyFlipped = !!cardBodyStyle.getPropertyValue('transform');

  if (isAlreadyFlipped) {
    backFlip(cardBodyStyle);
  } else forwardFlip(cardBodyStyle);

  return isAlreadyFlipped;
};

const forwardFlip = (cardBodyStyle) => {
  cardBodyStyle.setProperty('transform', 'rotateY(180deg)');
};

const backFlip = (cardBodyStyle) => {
  cardBodyStyle.setProperty('transform', '');
};

export default createActions;
