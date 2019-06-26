export default {
  brand() {
    const url = 'http://www.thechildrensplace.com/';

    return url.indexOf('thechildrensplace') > -1 ? 'tcp' : 'gymboree';
  },

  // This common function works for finding key in an object.
  // Please refer Account.jsx in core/src/components/features/account/Account/Account.jsx
  getObjectValue(obj, defaultVal, ...params) {
    if (!obj) return defaultVal;

    let objRef = obj;
    const paramsLen = params.length;
    for (let i = 0; i < paramsLen; i += 1) {
      if (objRef[params[i]]) {
        objRef = objRef[params[i]];
      } else {
        objRef = null;
        break;
      }
    }
    return objRef || defaultVal;
  },
};
