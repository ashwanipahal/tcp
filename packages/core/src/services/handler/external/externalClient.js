import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import { API_CONFIG } from '../../config';

/**
 * @summary This is to initialize superagent client to consume the JSONP external API.
 * @param {Object} reqObj - request param with endpoints and payload
 * @returns {Promise} Resolves with promise to consume the external json api.
 * Here since it is a jsonP, we receive both success and error in callback method.
 * Both success/Catch resolves the promise - which needs to be handled in abstractor calling the Service handler.
 */
const externalJsonpAPIClient = reqObj => {
  const { webService } = reqObj;
  const requestUrl = webService.URI;
  const requestType = webService.method.toLowerCase();
  return new Promise(resolve => {
    superagent[requestType](requestUrl)
      .query(reqObj.body)
      .use(
        jsonp({
          timeout: webService.reqTimeout,
        })
      )
      .then(response => {
        resolve(response);
      })
      .catch(response => resolve(response));
  });
};

/**
 * @summary This is to initialize superagent client to consume the external API.
 * @param {string} apiConfig - Api config to be utilized for brand/channel/locale config
 * @param {Object} reqObj - request param with endpoints and payload
 * @returns {Promise} Resolves with promise to consume the external api or reject in case of error
 */
const ExternalAPIClient = (apiConfig, reqObj) => {
  // TODO - Keeping it generic for now, to check if it fulfills all the variations of external call
  const { webService } = reqObj;

  if (webService.JSONP) {
    return externalJsonpAPIClient(reqObj);
  }

  const requestUrl = webService.URI;
  const requestType = webService.method.toLowerCase();
  const reqTimeout = API_CONFIG.apiRequestTimeout;
  const request = superagent[requestType](requestUrl)
    .accept(API_CONFIG.apiContentType)
    .timeout(reqTimeout);

  if (reqObj.header) {
    request.set(reqObj.header);
  }
  if (requestType === 'get') {
    request.query(reqObj.body);
  } else {
    request.send(reqObj.body);
  }

  const result = new Promise((resolve, reject) => {
    request
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
  result.abort = () => request.abort(); // allow callers to cancel the request by calling abort on the returned object.
  return result;
};

export default ExternalAPIClient;
