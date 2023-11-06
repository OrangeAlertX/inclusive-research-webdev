import newElem from './game-tools.mjs';

function createDifficulties(numberOfModes) {
  const allPossibleModes = [
    'Easy',
    'Medium',
    'Hard',
    'Challenge',
    'Extreme',
    'Nightmare',
    'Impossible',
  ];

  if (!(numberOfModes <= 7 && numberOfModes > 0)) {
    alert('Only 7 mods exist now, but you put ' + numberOfModes);
    return;
  }

  const elems = [];
  for (let i = 0; i < numberOfModes; i++) {
    const elem = newElem('button', 'btn', `btn${i + 1}`);
    elem.textContent = allPossibleModes[i];

    elems[i] = elem;
  }

  return elems;
}

function componentDifficultySelection() {
  const difficulty = newElem('div', 'difficulty');
  const buttons = createDifficulties(7);

  difficulty.append(...buttons);

  return difficulty;
}

export default componentDifficultySelection;
