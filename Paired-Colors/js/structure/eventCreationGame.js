import createGame from '../logics/createGame';

export default function eventCreationGame(game, options) {
  Array.from(game.difficulties).forEach((dif, i) => {
    dif.addEventListener('click', (e) => createGame(e, game, ...options[i]));
  });
}
