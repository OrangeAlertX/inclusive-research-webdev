import createCards from './createCards';
import createActions from './createActions';

const createGame = (e, game, qtCards, bunchSize, withDigits) => {
  const grid = game.newElem('div', 'grid');
  const cards = createCards(qtCards, bunchSize, withDigits, game.newElem);

  grid.append(...cards);
  game.playground.innerHTML = '';
  game.playground.append(grid);

  setCardsTheme(e, grid);
  changeOrder(cards);
  createActions(cards, bunchSize);
};

const changeOrder = (cards) => {
  for (const card of cards) {
    card.style.setProperty('order', `${parseInt(Math.random() * 100)}`);
  }
};

const setCardsTheme = (e, grid) => {
  const root = document.querySelector(':root');
  root.style.setProperty(
    '--currentDifficulty',
    window
      .getComputedStyle(e.currentTarget)
      .getPropertyValue('background-color')
  );
  grid.setAttribute('currentDifficulty', e.currentTarget.classList[1].at(-1));
};

export default createGame;
