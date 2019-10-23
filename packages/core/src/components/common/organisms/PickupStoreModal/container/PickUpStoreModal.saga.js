import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { PICKUP_MODAL_ACTIONS_CONSTANTS } from '../PickUpStoreModal.constants';
import { maxAllowedStoresInCart } from '../PickUpStoreModal.config';
import {
  setBopisStores,
  setStoreSearchError,
  setUserCartStores,
  getBopisStoresActn,
} from './PickUpStoreModal.actions';
import {
  submitGetBopisSearchByLatLng,
  getStoresPlusInventorybyLatLng,
  getCartStoresPlusInventory,
} from '../../../../../services/abstractors/productListing/pickupStoreModal';

export function* getPickupStores(action) {
  const {
    payload,
    payload: { skuId, quantity, distance, country, variantId },
  } = action;
  // Reset the bopis store data
  yield put(setBopisStores({ stores: [] }));
  // Reset error message
  yield put(setStoreSearchError(''));
  try {
    const locationRes = yield call(submitGetBopisSearchByLatLng, payload);
    const { errorMessage, location } = locationRes;
    if (errorMessage) {
      yield put(setStoreSearchError(errorMessage));
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

export function* getUserCartStores(action) {
  const { payload } = action;
  try {
    const { cartItemsCount } = payload.apiPayload;
    const { alwaysSearchForBOSS } = payload;
    yield put(setUserCartStores({ stores: null }));
    yield put(setStoreSearchError(''));
    let stores = [];
    if (cartItemsCount > 0) {
      stores = yield call(getCartStoresPlusInventory, payload.apiPayload);
    }
    const isSearchOnlyInCartStores = stores.length === maxAllowedStoresInCart;
    if (isSearchOnlyInCartStores && !alwaysSearchForBOSS) {
      yield put(setUserCartStores({ stores }));
    } else {
      yield put(setUserCartStores({ stores }));
      yield put(getBopisStoresActn(payload.apiPayload));
    }
  } catch (err) {
    logger.error(err);
  }
}

function* PickUpStoreSaga() {
  yield takeLatest(PICKUP_MODAL_ACTIONS_CONSTANTS.GET_BOPIS_STORES, getPickupStores);
  yield takeLatest(PICKUP_MODAL_ACTIONS_CONSTANTS.GET_USER_CART_STORES, getUserCartStores);
}

export default PickUpStoreSaga;
