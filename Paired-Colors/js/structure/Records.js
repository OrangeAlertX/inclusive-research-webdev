export default function Records(container, newElem) {
  const button = newElem('button', 'records-btn');
  const content = newElem('div', 'records');
  const list = newElem('ul', 'list');

  container.append(button);
  container.append(content);
  content.append(list);

  const classNameActive = content.className + '--active';
  button.addEventListener('click', () =>
    content.classList.toggle(classNameActive)
  );

  //test for css
  addRecord('192.168.0.1', 120, 15);
  addRecord('192.168.0.2', 55, 15);
  //

  Object.defineProperties(this, {
    button: { get: () => button },
    content: { get: () => content },
    list: { get: () => list },
    addRecord: { get: () => addRecord },
    removeRecord: { get: () => removeRecord },
  });

  function addRecord(name, time, clicks) {
    const newRecord = newElem('li', 'rec');
    newRecord.innerText = `${name} ${time} ${clicks}`;
    list.append(newRecord);
  }

  function removeRecord(record) {
    list.removeChild(record);
  }
}
