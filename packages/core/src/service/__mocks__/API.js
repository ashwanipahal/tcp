async function fetchData(baseURL, relURL, params = {}) {
  return new Promise((resolve, reject) => {
    let result = {};
    try {
      if (params.payload && params.payload.indexOf('URL') !== -1) {
        console.log('in the promise email subscription');
        // for email subscription
        result = {
          body: {
            redirecturl: '/email-confirmation',
          },
        };
      } else if (params.payload && params.payload.indexOf('address=') !== -1) {
        console.log('in the promise email verification');
        // for email verification
        result = {
          body: {
            status: 'valid',
          },
        };
      } else if (params.payload && params.payload.indexOf('mobile_phone') !== -1) {
        // for sms subscription
        result = true;
      }
      resolve(result);
    } catch (e) {
      reject();
      console.log('catch', e);
    }
  });
  // result.abort = () => request.abort(); // allow callers to cancel the request by calling abort on the returned object.
  // return result;
}

export default fetchData;
