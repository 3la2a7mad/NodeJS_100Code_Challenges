// Alaa Ahmad

const sum = require('./sum');

// The describe block creates a test suite.
describe('sum function', () => {

  // The test() function defines an individual test case.
  test('should correctly add two positive numbers', () => {
    // expect() is the assertion, toBe() is the matcher.
    expect(sum(2, 3)).toBe(5);
  });

  test('should correctly add a positive and a negative number', () => {
    expect(sum(10, -5)).toBe(5);
  });

  test('should correctly add two zeros', () => {
    expect(sum(0, 0)).toBe(0);
  });
});