import '../css/index.scss';

import Section from './structure/Section';
import createDifficulties from './structure/createDifficulties';
import eventCreationGame from './structure/eventCreationGame';
import Records from './structure/Records';

const NUMBEROFMODES = 7;
const OPTIONS = [
  [10, 2, true],
  [14, 2, false],
  [18, 3, true],
  [24, 3, false],
  [24, 4, true],
  [32, 4, false],
  [36, 6, false],
];
// OPTIONS.forEach((op, i) => {
//   if (op[0] % op[1] !== 0) throw `Wrong OPTION i`;
// });

// Create Game Elements
const game = new Section('fpc');
game.header = game.newElem('div', 'header');
game.difficulty = game.newElem('div', 'difficulty');
game.difficulties = createDifficulties(NUMBEROFMODES, game.newElem);
game.playground = game.newElem('div', 'playground');

// Append to DOM
document.getElementById('content').append(game.container);
game.container.append(game.header);
game.container.append(game.playground);
game.header.append(game.difficulty);
game.difficulty.append(...game.difficulties);

// Add Records
game.records = new Records(game.header, game.difficulty, game.newElem);

// Add game generation
eventCreationGame(game, OPTIONS);