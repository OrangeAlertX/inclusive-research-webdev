import { memoryWithoutCard, groupCards } from '../js/logics/createActions';

describe('tests with virtual DOM', () => {
  const cards = [];
  const card = document.createElement('div');
  for (let i = 0; i < 6; i++) {
    cards.push(card.cloneNode(true));
  }

  test('memoryWithoutCard', () => {
    expect(memoryWithoutCard(cards, card)).toHaveLength(6);

    const removedCard = cards[0];
    const tempExpect = expect(memoryWithoutCard(cards, removedCard));
    tempExpect.toHaveLength(5);
    tempExpect.not.toContain(removedCard);
  });

  test('groupCards', () => {
    expect(groupCards(cards, 2).size).toBe(cards.length);
  });
});
