import { initGameItems, CONTAINER_NAME } from './game-tools.mjs';
import { createEasyGame } from './games.mjs';

const createGame = () => {
  const gameItems = initGameItems();
  document.body.append(gameItems);
  const playground = document.getElementsByClassName(
    `${CONTAINER_NAME}__playground`
  )[0];
  playground.innerHTML = createEasyGame().outerHTML;
};

createGame();
