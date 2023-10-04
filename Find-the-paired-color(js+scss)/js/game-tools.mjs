// import { CONTAINER_NAME } from '../css/styles.css';

const CONTAINER_NAME = 'fpc';

const newElem = (elemName = 'section', styleName = '', styleMod = '') => {
  if (!styleName) styleName = elemName;

  const className =
    elemName != 'section' ? `${CONTAINER_NAME}__${styleName}` : CONTAINER_NAME;

  const elem = document.createElement(elemName);
  if (elem instanceof HTMLUnknownElement) throw 'HTMLUnknownElement created!';

  elem.classList.add(className);
  if (styleMod) elem.classList.add(`${className}--${styleMod}`);

  return elem;
};

const createDifficulties = (numberOfModes) => {
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
};

const componentDifficultySelection = () => {
  const difficulty = newElem('div', 'difficulty');
  const buttons = createDifficulties(7);

  difficulty.append(...buttons);

  return difficulty;
};

const initGameItems = () => {
  const container = newElem();
  const difficulty = componentDifficultySelection();
  const playground = newElem('div', 'playground');
  container.append(difficulty, playground);

  return playground;
};

export { initGameItems, newElem };
