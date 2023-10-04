import { initGameItems } from './game-tools.mjs';
import { createEasyGame } from './games.mjs';

const createGame = () => {
  const playground = initGameItems();
  createEasyGame(playground);
};

createGame();
