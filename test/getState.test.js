/* global it, describe */

const assert = require('chai').assert;
const getState = require('../flow-output/getState');

describe('getState', () => {
  it('should be a function', () => {
    assert.isFunction(getState);
  });

  it('should return the correct state abbreviation for a single-word city name', () => {
    assert.strictEqual(getState('Boston'), 'MA');
    assert.strictEqual(getState('Blacksburg'), 'VA');
    assert.strictEqual(getState('Chicago'), 'IL');
    assert.strictEqual(getState('Bryan'), 'TX');
    assert.strictEqual(getState('Clover'), 'SC');
  });

  it('should return the correct state abbreviation for a compound city name', () => {
    assert.strictEqual(getState('Los Angeles'), 'CA');
    assert.strictEqual(getState('San Francisco'), 'CA');
    assert.strictEqual(getState('New Orleans'), 'LA');
    assert.strictEqual(getState('North Billerica'), 'MA');
  });
});

