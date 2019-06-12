export default {
  isTCPApp() {
    const url = 'http://www.thechildrensplace.com/';

    return url.indexOf('thechildrensplace') > -1 || false;
  },
};
