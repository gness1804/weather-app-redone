// @flow

const checkForSafari = (browser: string): boolean => {
  const regex1 = /chrome/i;
  const regex2 = /chromium/i;
  const regex3 = /safari/i;
  if (browser.match(regex3) && !browser.match(regex2) && !browser.match(regex1)) {
    return true;
  }
  return false;
};

export default checkForSafari;