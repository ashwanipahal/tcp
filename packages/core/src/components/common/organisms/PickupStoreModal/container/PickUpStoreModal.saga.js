import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { PICKUP_MODAL_ACTIONS_CONSTANTS } from '../PickUpStoreModal.constants';
import { setBopisStores } from './PickUpStoreModal.actions';
import getLatLng, {
  getStoresPlusInventorybyLatLng,
} from '../../../../../services/abstractors/productListing/pickupStoreModal';

export function* getPickupStores(arg) {
  const {
    payload,
    payload: { skuId, quantity, distance, country, variantId },
  } = arg;
  try {
    const location = yield call(getLatLng, payload);
    const reqObj = {
      skuId,
      quantity,
      distance,
      lat: location.lat,
      lng: location.lng,
      country,
      variantId,
    };
    const stores = yield call(getStoresPlusInventorybyLatLng, reqObj);
    yield put(setBopisStores({ stores }));
  } catch (err) {
    logger.error(err);
  }
}

function* PickUpStoreSaga() {
  yield takeLatest(PICKUP_MODAL_ACTIONS_CONSTANTS.GET_BOPIS_STORES, getPickupStores);
}

export default PickUpStoreSaga;
