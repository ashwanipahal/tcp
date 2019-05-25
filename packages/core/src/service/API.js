import superagent from 'superagent';

async function fetchData(baseURL, relURL, params={}, method) {
  let requestType = method;
  let requestUrl = baseURL + relURL;
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
        'Cache-Control': 'no-store, must-revalidate'
      };
  }
  let request = superagent[requestType](requestUrl)
    .set(reqSetting)
    .accept('application/json');
  // .timeout(reqTimeout);

  if (params.header) {
    request.set(params.header);
  }

  // if (!args.webService.unbxd) {
  //   request.withCredentials();
  // }
  // const cachedResult = apiCacheManager.getCachedResult(cacheArgs);
  // if (cachedResult) {
  //   return Promise.resolve(cachedResult);
  // }
  // make the api call
  // if (requestType.toLowerCase() === 'get') {
  //   request.query(args.body);
  //   if (args.webService.unbxd && request._query && request._query.length > 0) {
  //     request._query[0] = decodeURIComponent(request._query[0]);
  //   }
  // } else {
  //   request.send(args.body);
  // }
  let result = new Promise((resolve, reject) => {
    request
      .then((response) => {
  //        console.log("resposne *************", response);
        resolve(response);
  // eslint-disable-next-line prefer-rest-params
  //      apiCacheManager.setCachedResult(cacheArgs, response);
      //   webServiceSubscriber.notifyServiceResponse({
      //     request: {
      //       body: args.body,
      //       header: args.header,
      //       settings: reqSetting
      //     },
      //     response: response.body
      //   }, args.webService.URI);
      // })
      // .catch((err) => {

      //   trackError({
      //     error: err,
      //     tags: { 
      //       component: 'ApiHelper',
      //       endpoint: args.webService.URI,
      //       'trace-request-id': reqSetting['tcp-trace-request-id'],
      //       'trace-session-id': reqSetting['tcp-trace-session-id']
      //     },
      //     extraData: {
      //       ...args,
      //       ...reqSetting
      //     },
      //     groupKeys: ['api-error', args.webService.URI]
      //   });

      //   reject(err);

      //   webServiceSubscriber.notifyServiceResponse({
      //     request: {
      //       body: args.body,
      //       header: args.header,
      //       settings: reqSetting
      //     },
      //     response: err.response && err.response.body
      //   }, args.webService.URI);
      }).catch((e) => {
        console.log(e);
      });
  });
  result.abort = () => request.abort(); // allow callers to cancel the request by calling abort on the returned object.
  return result;
}

export default fetchData;

