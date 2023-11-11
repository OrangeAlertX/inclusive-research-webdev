const genColor = () => Math.floor(Math.random() * 256);

export default function createCards(qt, bunchSize, withDigits, newElem) {
  const cards = [];
  const bunches = parseInt(qt / bunchSize);

  for (let i = 0; i < bunches; i++) {
    const card = newElem('div', 'card');
    const cardBody = newElem('div', 'cardBody');
    const cardFace = newElem('div', 'cardFace');
    const cardBack = newElem('div', 'cardBack');
    card.append(cardBody);
    cardBody.append(cardFace, cardBack);
    if (withDigits) cardBack.textContent = `${i}`;
    cardBack.style.setProperty(
      'background-color',
      `rgb(${genColor()},${genColor()},${genColor()})`
    );
    cards.push(card);
    for (let i = 1; i < bunchSize; i++) {
      const cardCopy = card.cloneNode(true);
      cards.push(cardCopy);
    }
  }

  return cards;
}
