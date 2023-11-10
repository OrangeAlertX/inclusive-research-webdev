let counter;
let bunchSize;
let cardBunches;
const memory = [];

function groupCards(cards, bS) {
  const cardBunches = new Map();

  for (let i = 0; i < counter; i++) {
    const bunchID = Math.floor(i / bS);
    cardBunches.set(cards[i], bunchID);
  }

  return cardBunches;
}

function createActions(cards, bS) {
  counter = cards.length;
  bunchSize = bS;
  cardBunches = groupCards(cards, bS);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('click', () => actionFlipCard(card));
  }
}

const actionFlipCard = (card) => {
  if (isAlreadyFlipped(card)) {
    memory.splice(0, bunchSize, memoryWithoutCard(memory, card));
    backFlip(card);
    return;
  } else {
    forwardFlip(card);
  }

  memory.push(card);
  if (cardsMatching(card) && memory.length === bunchSize)
    acceptCards(memory, card);
};
const memoryWithoutCard = (memory, card) => {
  return memory.filter((item) => item !== card);
};

const cardsMatching = (card) => {
  memory.forEach((cardM) => {
    const isNotSameCards = cardBunches.get(cardM) !== cardBunches.get(card);

    if (isNotSameCards) {
      clearGridMemory(card.parentElement);
      return false;
    }
  });

  return true;
};

const clearGridMemory = (grid) => {
  const last = memory.at(-1);
  for (let i = 0; i < memory.length - 1; i++) {
    const cardM = memory[i];
    backFlip(cardM);
  }

  memory.length = 0;
  // for (const card of grid.children) {
  //   if (card.children[0].style.transform) card.children[0].style.transform = '';
  // }
  memory.push(last);
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
  console.log(cards);
  cards.forEach((card, i) => {
    const cardBodyStyle = card.children[0].style;
    backFlip(cardBodyStyle);

    setTimeout(() => {
      card.style.setProperty('visibility', 'visible');
      forwardFlip(cardBodyStyle);
    }, 100 * i);
  });
};

const isAlreadyFlipped = (card) => {
  const cardBodyStyle = card.children[0].style;
  return !!cardBodyStyle.getPropertyValue('transform');
};

const forwardFlip = (card) => {
  const cardBodyStyle = card.children[0].style;
  cardBodyStyle.setProperty('transform', 'rotateY(180deg)');
};

const backFlip = (card) => {
  const cardBodyStyle = card.children[0].style;
  cardBodyStyle.setProperty('transform', '');
};

export default createActions;
export { memoryWithoutCard };
