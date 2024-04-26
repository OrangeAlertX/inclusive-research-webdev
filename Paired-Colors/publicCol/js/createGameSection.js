import '../css/styles.scss';
import '../favicon.ico';

import Section from './structure/Section';
import createDifficulties from './structure/createDifficulties';
import eventCreationGame from './structure/eventCreationGame';
import adjustFontSize from './adjustFontSize';
import fullPage from './fullPage';
import openCloseDifficulties from './openCloseDifficulties';

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

const CONTAINER_NAME = 'fpc';
// Create Game Elements
const game = new Section(CONTAINER_NAME);
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

// Add game generation
eventCreationGame(game, OPTIONS);

// Select size of cards
adjustFontSize(game.container);

// Full page on click
fullPage(game.playground);

// LocalStorage for open difficulties
openCloseDifficulties(game.difficulties);
