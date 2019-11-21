import endpoints from '@tcp/core/src/services/endpoints';
import { executeStatefulAPICall } from '@tcp/core/src/services/handler';

/**
 * @function getFavoriteStore
 * @summary This will get a users favorite store that is saved on their account,
 *  if the user's favorite store doesn't exist then
 *  default store on the basis of lat long of user is fetched.
 * @return empty object if you do not have a default store else you will get back
 */

const getFavoriteStore = (skuId = null, lat = null, long = null, variantId = null) => {
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
    webService: endpoints.getFavoriteStore,
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

export default getFavoriteStore;
