import { sum } from './example';

test('Chech if data is equail with our expectations', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test('Check if its null', () => {
  const test = null;
  expect(test).toBeNull();
  expect(test);
});
