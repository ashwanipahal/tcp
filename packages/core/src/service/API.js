import superagent from 'superagent';

async function fetchData(baseURL, relURL, params = {}, method) {
  const requestType = method;
  const requestUrl = baseURL + relURL;
  let reqSetting = {};

  if (!params.unbxd) {
    reqSetting = {
      ...reqSetting,
      langId: params.langId,
      storeId: params.storeId,
      Pragma: 'no-cache',
      Expires: 0,
      catalogId: params.catalogId,
      deviceType: params.isMobile ? 'mobile' : 'desktop',
      'Cache-Control': 'no-store, must-revalidate',
      'Content-Type': 'application/json',
    };

    if (params.nickName) {
      reqSetting.nickName = params.nickName;
    }

    if (params.fromPage) {
      reqSetting.fromPage = params.fromPage;
    }
    if (params.isRest) {
      reqSetting.isRest = params.isRest;
    }
    reqSetting.withCredentials();
  }
  const request = superagent[requestType](requestUrl)
    .set(reqSetting)
    .accept('application/json');
  // .timeout(reqTimeout);

  if (params.header) {
    request.set(params.header);
  }

  if (params.payload) {
    request.send(params.payload);
  }

  const result = new Promise((resolve, reject) => {
    request
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        reject(e);
      });
  });
  result.abort = () => request.abort(); // allow callers to cancel the request by calling abort on the returned object.
  return result;
}

export default fetchData;
