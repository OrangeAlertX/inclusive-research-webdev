import { initGameItems } from './game-tools.mjs';

const createGame = () => {
  const gameItems = initGameItems();
  document.body.append(gameItems);
};
createGame();
