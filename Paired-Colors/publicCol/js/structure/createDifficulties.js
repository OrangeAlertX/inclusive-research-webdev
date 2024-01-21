export default function createDifficulties(numberOfModes, newElem) {
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
    throw 'Only 7 mods exist now, but you put ' + numberOfModes;
  }

  const elems = [];
  for (let i = 0; i < numberOfModes; i++) {
    const elem = newElem('button', 'btn', `btn${i + 1}`);
    elem.textContent = allPossibleModes[i];

    elems[i] = elem;
  }

  return elems;
}
