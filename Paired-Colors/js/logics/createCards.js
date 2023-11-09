const getColor = () => Math.floor(Math.random() * 256);

export default function createCards(qt, bunchSize, newElem) {
  const cards = [];
  const bunches = parseInt(qt / bunchSize);

  for (let i = 0; i < bunches; i++) {
    const card = newElem('div', 'card');
    const cardBody = newElem('div', 'cardBody');
    const cardFace = newElem('div', 'cardFace');
    const cardBack = newElem('div', 'cardBack');
    card.append(cardBody);
    cardBody.append(cardFace, cardBack);
    card.setAttribute('bunchID', `bunch${i + 1}`);
    cardBack.textContent = `${i}`;
    cardBack.style.setProperty(
      'background-color',
      `rgb(${getColor()},${getColor()},${getColor()})`
    );
    cards.push(card);
    for (let i = 1; i < bunchSize; i++) {
      const cardCopy = card.cloneNode(true);
      cards.push(cardCopy);
    }
  }

  return cards;
}
