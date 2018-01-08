/* global it, describe */

const assert = require('chai').assert;
const { checkForSafari } = require('../flow-output/checkForSafari');
const browsers = require('./helpers/browsers');

describe('checkForSafari', () => {
  it('should be a function', () => {
    assert.isFunction(checkForSafari);
  });

  it('should return true for safari', () => {
    assert.strictEqual(checkForSafari(browsers.macOS.safari), true);
  });

  it('should return false for firefox', () => {
    assert.strictEqual(checkForSafari(browsers.macOS.firefox), false);
  });

  it('should return false for chrome', () => {
    assert.strictEqual(checkForSafari(browsers.macOS.chrome), false);
  });
});