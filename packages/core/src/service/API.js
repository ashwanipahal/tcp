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
      'Content-Type': 'application/json'
    };
    if(params.nickName){
      reqSetting.nickname = params.nickName
    }
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

  const result = new Promise(resolve => {
    request
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.log(e);
      });
  });
  result.abort = () => request.abort(); // allow callers to cancel the request by calling abort on the returned object.
  return result;
}

export default fetchData;
