function groupCards(cards, bS) {
  const cardBunches = new Map();

  for (let i = 0; i < cards.length; i++) {
    const bunchID = Math.floor(i / bS);
    cardBunches.set(cards[i], bunchID);
  }

  return cardBunches;
}

let counter;
function createActions(cards, bS) {
  counter = cards.length;
  const bunchSize = bS;
  const cardBunches = groupCards(cards, bS);
  const memory = [];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('click', () =>
      actionFlipCard(card, { bunchSize, cardBunches, memory })
    );
  }
}

const actionFlipCard = (card, props) => {
  const memory = props.memory;

  if (isAlreadyFlipped(card)) {
    memory.splice(0, props.bunchSize, ...memoryWithoutCard(memory, card));
    backFlip(card);
    return;
  }

  forwardFlip(card);
  memory.push(card);

  if (cardsMatching(card, memory, props) && memory.length === props.bunchSize)
    acceptCards(memory);
};
const memoryWithoutCard = (memory, card) => {
  return memory.filter((item) => item !== card);
};

const cardsMatching = (card, memory, { cardBunches }) => {
  memory.forEach((cardM) => {
    const isNotSameCards = cardBunches.get(cardM) !== cardBunches.get(card);

    if (isNotSameCards) {
      clearGridMemory(memory);
      return false;
    }
  });

  return true;
};

const clearGridMemory = (memory) => {
  const last = memory.at(-1);
  for (let i = 0; i < memory.length - 1; i++) {
    backFlip(memory[i]);
  }

  memory.length = 0;
  memory.push(last);
};

const acceptCards = (memory) => {
  memory.forEach((cardM) => {
    cardM.style.setProperty('pointer-events', 'none');
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
    backFlip(card);

    setTimeout(() => {
      card.style.setProperty('visibility', 'visible');
      forwardFlip(card);
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
export { memoryWithoutCard, groupCards };
