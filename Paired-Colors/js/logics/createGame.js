import createCards from './createCards';
import createActions from './createActions';

const createGame = (e, game, qtCards, bunchSize) => {
  const grid = game.newElem('div', 'grid');
  const cards = createCards(qtCards, bunchSize, game.newElem);

  grid.append(...cards);
  game.playground.innerHTML = '';
  game.playground.append(grid);

  setCardsTheme(e);
  changeOrder(cards);
  createActions(cards, bunchSize);
};

const changeOrder = (cards) => {
  for (const card of cards) {
    card.style.setProperty('order', `${parseInt(Math.random() * 100)}`);
  }
};

const setCardsTheme = (e) => {
  const root = document.querySelector(':root');
  root.style.setProperty(
    '--currentDifficulty',
    window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue('background-color')
  );
};

export default createGame;
