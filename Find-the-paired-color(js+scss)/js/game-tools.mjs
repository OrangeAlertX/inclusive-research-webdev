// import { CONTAINER_NAME } from '../css/styles.css';

const CONTAINER_NAME = 'fpc';

const newElem = (elemName = 'section', styleName = '') => {
  if (styleName === false) styleName = elemName;

  const className =
    elemName != 'section' ? `${CONTAINER_NAME}__${styleName}` : CONTAINER_NAME;

  const elem = document.createElement(elemName);
  if (elem instanceof HTMLUnknownElement) throw 'HTMLUnknownElement created!';

  elem.className = className;

  return elem;
};

const componentDifficultySelection = () => {
  const difficulty = newElem('div', 'difficulty');
  const button1 = newElem('button', 'btn');
  button1.textContent = 'Easy';
  difficulty.append(button1);

  return difficulty;
};

const initGameItems = () => {
  const container = newElem();
  const difficulty = componentDifficultySelection();
  const playground = newElem('div', 'playground');
  container.append(difficulty, playground);

  return container;
};

export { initGameItems };
