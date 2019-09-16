import endpoints from '@tcp/core/src/services/endpoints';
import { executeStatefulAPICall } from '@tcp/core/src/services/handler';
import { ERRORS } from '@tcp/core/src/utils/errorMessage.util';

const getFormattedError = err => {
  if (err.response && err.response.body) {
    return err.response.body.errors[0]
      ? err.response.body.errors[0].errorKey
      : err.response.body.errorKey;
  }
  return 'genericError';
};

/**
 * This method is used to extract error message from the response
 * @param {object} err - Error response object
 */
export const errorHandler = err => {
  if (err.response && err.response.body && err.response.body.errors) {
    throw getFormattedError(err);
  } else if (err && err.err && err.err.errorMessage) {
    // eslint-disable-next-line no-underscore-dangle
    throw err.err.errorMessage._error;
  }
  throw new Error(ERRORS.SYSTEM_ERROR);
};

/**
 * @function getFavoriteStore
 * @summary This will get a users favorite store that is saved on their account,
 *  if the user's favorite store doesn't exist then
 *  default store on the basis of lat long of user is fetched.
 * @return empty object if you do not have a default store else you will get back
 */

export const getFavoriteStore = (skuId = null, { lat, long } = {}, variantId) => {
  const payload = {
    header: {
      action: 'get',
      latitude: lat,
      longitude: long,
      catEntryId: skuId,
      itemPartNumber: variantId,
    },
    body: {
      latitude: lat,
      longitude: long,
      catEntryId: skuId,
      itemPartNumber: variantId,
    },
    webService: endpoints.getMyFavoriteStore,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      if (res.body.displayValue) {
        return res.body;
      }
      return null;
    })
    .catch(err => {
      throw err;
    });
};
