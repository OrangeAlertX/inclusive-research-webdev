import { memoryWithoutCard } from '../js/logics/createActions';

test('memoryWithoutCard', () => {
  const cards = [];
  for (let i = 0; i < 6; i++) {
    const elem = document.createElement('div');
    cards.push(elem);
  }
  console.log(cards);

  expect(memoryWithoutCard(cards, cards[0])).toHaveLength(5);
});
