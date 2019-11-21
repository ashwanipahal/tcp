/* istanbul ignore file */
/**
 * @description abstractors is responsible for making twitter calls like Auth.
 */

import endpoints from '../../../../../services/endpoints';
import { executeStatefulAPICall } from '../../../../../services/handler/handler';
import { getAPIConfig } from '../../../../../utils';

/**
 *
 * @param {object} apiHelper - object data which is required for
 * the API call. This object contains varous options which
 * are required for the call
 */

const getAuthToken = () => {
  const apiConfig = getAPIConfig();
  const payload = {
    webService: endpoints.getTwitterAuthToken,
    body: {
      storeId: apiConfig.storeId,
    },
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      return res.body.requestToken;
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * @method getAccessToken this method fetchs the acess token for person connecting thier twitter with TCP.
 * This is the step Three of twitter integration where we send the auth token and verifier received from step 2 and
 * send it to twitter api which in return provides with the access token.
 * @param oauthToken {String} The auth token for the user received in step 2.
 * @param verifier {String} The verifier for the user received in step 2.
 */

const getAccessToken = (oauthToken, verifier) => {
  const apiConfig = getAPIConfig();
  const payload = {
    header: {
      verifier,
      oauthToken,
      storeId: apiConfig.storeId,
    },
    webService: endpoints.getTwitterAccessToken,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      return res.body.accessToken;
    })
    .catch(err => {
      console.log(err);
    });
};

export { getAuthToken, getAccessToken };
