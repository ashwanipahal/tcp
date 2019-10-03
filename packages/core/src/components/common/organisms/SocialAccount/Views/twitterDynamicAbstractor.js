/**
 * @description abstractors is responsible for making twitter calls like Auth.
 */

import {endpoints} from './endpoints.js';
import {ServiceResponseError} from 'service/ServiceResponseError';

let previous = null;

/**
 *
 * @param {object} apiHelper - object data which is required for
 * the API call. This object contains varous options which
 * are required for the call
 */
export const getTwitterAbstractor =  apiHelper => {
  if (!previous || previous.apiHelper !== apiHelper) {
    previous = new TwitterDynamicAbstractor(apiHelper);
  }
  return previous;
};

class TwitterDynamicAbstractor {
    constructor (apiHelper) {
        this.apiHelper = apiHelper;
    }

    /**
     * @method getAuthToken this method fetchs the auth token for twitter. This is the step one of twitter integration
     * @param null
     */

    getAuthToken = () => {
        let payload = {
            header: {
                storeId: this.apiHelper.configOptions.storeId
            },
            webService: endpoints.getTwitterAuthToken
        };
        return this.apiHelper.webServiceCall(payload).then((res) => {
            if (this.apiHelper.responseContainsErrors(res)) {
              throw new ServiceResponseError(res);
            }
            return res.body.requestToken;
          }).catch((err) => {
            throw this.apiHelper.getFormattedError(err);
          });
    }

    /**
     * @method getAccessToken this method fetchs the acess token for person connecting thier twitter with TCP.
     * This is the step Three of twitter integration where we send the auth token and verifier received from step 2 and 
     * send it to twitter api which in return provides with the access token.
     * @param oauthToken {String} The auth token for the user received in step 2.
     * @param verifier {String} The verifier for the user received in step 2.
     */

    getAccessToken = (oauthToken,verifier) => {
        let payload = {
            header: {
                verifier,
                oauthToken,
                storeId: this.apiHelper.configOptions.storeId
            },
            webService: endpoints.getTwitterAccessToken
        };
        return this.apiHelper.webServiceCall(payload).then((res) => {
            if (this.apiHelper.responseContainsErrors(res)) {
              throw new ServiceResponseError(res);
            }
            return res.body.accessToken;
          }).catch((err) => {
            throw this.apiHelper.getFormattedError(err);
          });
    }
}