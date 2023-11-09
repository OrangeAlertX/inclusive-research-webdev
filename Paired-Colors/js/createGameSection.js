import CreateSection from './structure/CreateSection';
import createDifficulties from './structure/createDifficulties';
import eventCreationGame from './structure/eventCreationGame';

import '../css/index.css';

const NUMBEROFMODES = 7;
const OPTIONS = [
  [10, 2],
  [14, 2],
  [18, 3],
  [24, 3],
  [24, 4],
  [32, 4],
  [36, 6],
];
// OPTIONS.forEach((op, i) => {
//   if (op[0] % op[1] !== 0) throw `Wrong OPTION i`;
// });

// Create Game Elements
const game = new CreateSection('fpc');
game.difficulty = game.newElem('div', 'difficulty');
game.difficulties = createDifficulties(NUMBEROFMODES, game.newElem);
game.playground = game.newElem('div', 'playground');

// Append to DOM
document.getElementById('content').append(game.container);
game.container.append(game.difficulty);
game.container.append(game.playground);
game.difficulty.append(...game.difficulties);

// Add game generation
eventCreationGame(game, OPTIONS);
