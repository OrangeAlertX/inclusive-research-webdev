import { initGameItems } from './game-tools.mjs';
import { createGame } from './games.mjs';

const createGameWrapper = () => {
  const container = initGameItems();
  document.body.append(container);
  setGameGreation(container);
};

const setGameGreation = (container) => {
  const difficulties = container.children[0];
  difficulties.children[0].addEventListener('click', (e) => {
    createGame(e, container.children[1], 8, 2);
  });
  difficulties.children[1].addEventListener('click', (e) => {
    createGame(e, container.children[1], 12, 2);
  });
  difficulties.children[2].addEventListener('click', (e) => {
    createGame(e, container.children[1], 18, 3);
  });
  difficulties.children[3].addEventListener('click', (e) => {
    createGame(e, container.children[1], 24, 3);
  });
  difficulties.children[4].addEventListener('click', (e) => {
    createGame(e, container.children[1], 24, 4);
  });
  difficulties.children[5].addEventListener('click', (e) => {
    createGame(e, container.children[1], 32, 4);
  });
  difficulties.children[6].addEventListener('click', (e) => {
    createGame(e, container.children[1], 30, 6);
  });
};

createGameWrapper();
