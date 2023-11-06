// import { CONTAINER_NAME } from '../css/styles.css';

const CONTAINER_NAME = 'fpc';

function newElem(elemName = 'section', styleName = '', styleMod = '') {
  if (!styleName) styleName = elemName;

  const className =
    elemName != 'section' ? `${CONTAINER_NAME}__${styleName}` : CONTAINER_NAME;

  const elem = document.createElement(elemName);
  if (elem instanceof HTMLUnknownElement) throw 'HTMLUnknownElement created!';

  elem.classList.add(className);
  if (styleMod) elem.classList.add(`${className}--${styleMod}`);

  return elem;
}

export default newElem;
