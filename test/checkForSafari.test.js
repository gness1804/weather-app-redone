/* global it, describe */

const assert = require('chai').assert;
const { checkForSafari } = require('../flow-output/checkForSafari');

describe('checkForSafari', () => {
  it('should be a function', () => {
    assert.isFunction(checkForSafari);
  });
});