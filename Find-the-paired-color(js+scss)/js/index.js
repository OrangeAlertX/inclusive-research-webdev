import createGame from './games.mjs';
import componentDifficultySelection from './difficulties.mjs';
import newElem from './game-tools.mjs';

import '../css/index.css';

function createGameWrapper() {
  const container = initGameItems();

  document.getElementById('content').append(container);
  setGameGreation(container);
}

function initGameItems() {
  const container = newElem();
  const difficulty = componentDifficultySelection();
  const playground = newElem('div', 'playground');
  container.append(difficulty, playground);

  return container;
}

function setGameGreation(container) {
  const difficulties = container.children[0];
  const options = [
    [10, 2],
    [14, 2],
    [18, 3],
    [24, 3],
    [24, 4],
    [32, 4],
    [36, 6],
  ];

  Array.from(difficulties.children).forEach((dif, i) => {
    dif.addEventListener('click', (e) =>
      createGame(e, container.children[1], ...options[i])
    );
  });
}

createGameWrapper();
