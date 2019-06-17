export default {
  brand() {
    const url = 'http://www.thechildrensplace.com/';

    return url.indexOf('thechildrensplace') > -1 ? 'tcp' : 'gymboree';
  },
  stripPx(value) {
    return value && value.replace('px', '');
  },
};
