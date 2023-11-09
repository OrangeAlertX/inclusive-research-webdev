function CreateSection(root) {
  const container = document.createElement('div');
  container.classList.add(root);
  Object.defineProperty(this, 'container', { get: () => container });
  Object.defineProperty(this, 'newElem', { get: () => newElem });

  function newElem(elemName, styleName = '', styleMod = '') {
    if (!styleName) styleName = elemName;

    const className = `${root}__${styleName}`;

    const elem = document.createElement(elemName);
    if (elem instanceof HTMLUnknownElement) throw 'HTMLUnknownElement created!';
    elem.classList.add(className);

    if (styleMod) elem.classList.add(`${className}--${styleMod}`);

    return elem;
  }
}

export default CreateSection;
