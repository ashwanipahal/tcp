import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { PICKUP_MODAL_ACTIONS_CONSTANTS } from '../PickUpStoreModal.constants';
import {
  setBopisStores,
  setLocationSearchError,
  setStoreSearchError,
} from './PickUpStoreModal.actions';
import getLatLng, {
  getStoresPlusInventorybyLatLng,
} from '../../../../../services/abstractors/productListing/pickupStoreModal';

export function* getPickupStores(arg) {
  const {
    payload,
    payload: { skuId, quantity, distance, country, variantId },
  } = arg;
  // Reset the bopis store data
  yield put(setBopisStores({}));
  try {
    const locationRes = yield call(getLatLng, payload);
    const { errorMessage, location } = locationRes;
    if (errorMessage) {
      yield put(setLocationSearchError(errorMessage));
    } else {
      const reqObj = {
        skuId,
        quantity,
        distance,
        lat: location.lat,
        lng: location.lng,
        country,
        variantId,
      };
      const storesResponse = yield call(getStoresPlusInventorybyLatLng, reqObj);
      const { error, stores } = storesResponse;
      if (error) {
        yield put(setStoreSearchError(error));
      } else {
        yield put(setBopisStores({ stores }));
      }
    }
  } catch (err) {
    logger.error(err);
  }
}

function* PickUpStoreSaga() {
  yield takeLatest(PICKUP_MODAL_ACTIONS_CONSTANTS.GET_BOPIS_STORES, getPickupStores);
}

export default PickUpStoreSaga;
