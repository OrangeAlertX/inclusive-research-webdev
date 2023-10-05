import { initGameItems } from './game-tools.mjs';
import { createEasyGame } from './games.mjs';

const createGame = () => {
  const container = initGameItems();
  document.body.append(container);
  createEasyGame(container.children[1]);
};

createGame();
