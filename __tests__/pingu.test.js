const pingu = require('../index');
const path = require('path');

test('pingu.setLogLevel sets to and returns', () => {
  pingu.setLogLevel(2);
  expect(pingu.checkLogLevel()).toBe(2);
});

test('pingu.log returns', () => {
  expect(pingu.log('Jest')).toBe(true);
});

test('pingu.dir returns', () => {
  expect(pingu.dir('Jest')).toBe(true);
});

test('pingu.table returns', () => {
  expect(pingu.table('Jest')).toBe(true);
});

test('pingu.warn returns', () => {
  expect(pingu.warn('Jest')).toBe(true);
});

test('pingu.error returns', () => {
  expect(pingu.error('Jest')).toBe(true);
});
