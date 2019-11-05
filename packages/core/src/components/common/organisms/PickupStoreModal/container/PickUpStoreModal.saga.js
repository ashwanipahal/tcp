import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { setDefaultStore } from '@tcp/core/src/components/features/account/User/container/User.actions';
import getBopisInventoryDetails from '@tcp/core/src/services/abstractors/common/bopisInventory/bopisInventory';
import { getSetGeoDefaultStoreActn } from '@tcp/core/src/components/features/storeLocator/StoreLanding/container/StoreLanding.actions';
import { BOPIS_ITEM_AVAILABILITY } from '@tcp/core/src/components/common/organisms/PickupStoreModal/PickUpStoreModal.constants';
import { PICKUP_MODAL_ACTIONS_CONSTANTS } from '../PickUpStoreModal.constants';
import { maxAllowedStoresInCart } from '../PickUpStoreModal.config';
import {
  setBopisStores,
  setStoreSearchError,
  setUserCartStores,
  setStoreSearchingState,
  setIsGetUserStoresLoaded,
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

function getItemBopisAvailability(inventory, quantity) {
  if (inventory.quantity < quantity || inventory.status === 'Out of Stock') {
    return BOPIS_ITEM_AVAILABILITY.UNAVAILABLE;
  }
  if (inventory.status === 'In Stock') {
    return BOPIS_ITEM_AVAILABILITY.AVAILABLE;
  }
  return BOPIS_ITEM_AVAILABILITY.LIMITED;
}

function* getFavStoreDetails(stores, apiPayload) {
  // call favourite store api if the user's cart have not any store or
  // the selected cart store is not favorite
  const favoriteStore = {
    ...stores.find(store => store.basicInfo.isDefault),
  };
  const { defaultStore: preferredStore, skuId, quantity, variantId, variantNo } = apiPayload;
  const defaultStore = Object.assign({}, preferredStore);
  if (Object.keys(favoriteStore).length) {
    yield put(setDefaultStore(favoriteStore));
  } else if (defaultStore && defaultStore.basicInfo) {
    try {
      const itemInfo = [
        {
          storeId: defaultStore.basicInfo.id && defaultStore.basicInfo.id.substring(2),
          variantNo,
          itemPartNumber: variantId,
        },
      ];
      const inventoryArray = yield call(getBopisInventoryDetails, itemInfo);
      const inventory = inventoryArray[0];
      defaultStore.productAvailability = {
        quantity: inventory.quantity,
        skuId,
        status: getItemBopisAvailability(inventory, quantity),
      };
    } catch (err) {
      defaultStore.productAvailability = {
        quantity: 0,
        skuId,
        status: BOPIS_ITEM_AVAILABILITY.UNAVAILABLE,
      };
    }
    if (!defaultStore.basicInfo.isDefault) {
      // setting store as user's geo default store in state not fav store
      // TODO - To validate this once HOME Pod has worked on it
      yield put(getSetGeoDefaultStoreActn(defaultStore));
    } else {
      yield put(setDefaultStore(defaultStore));
    }
  }
}

export function* getUserCartStores(action) {
  const { payload } = action;
  try {
    const { alwaysSearchForBOSS, apiPayload } = payload;
    const { cartItemsCount } = apiPayload;
    yield put(setUserCartStores({ stores: null }));
    yield put(setStoreSearchError(''));
    yield put(setIsGetUserStoresLoaded(false));
    let stores = [];
    yield put(setStoreSearchingState(true));
    if (cartItemsCount > 0) {
      stores = yield call(getCartStoresPlusInventory, apiPayload);
    }
    const isSearchOnlyInCartStores = stores.length === maxAllowedStoresInCart;
    yield put(setUserCartStores({ stores }));
    const isValidZipCode = apiPayload && apiPayload.locationPromise;
    if (isValidZipCode && (!isSearchOnlyInCartStores || alwaysSearchForBOSS)) {
      yield call(getPickupStores, { payload: apiPayload });
    }
    if (!isSearchOnlyInCartStores) {
      yield call(getFavStoreDetails, stores, apiPayload);
    }
    yield put(setIsGetUserStoresLoaded(true));
    yield put(setStoreSearchingState(false));
  } catch (err) {
    logger.error(err);
    yield put(setStoreSearchingState(false));
  }
}

function* PickUpStoreSaga() {
  yield takeLatest(PICKUP_MODAL_ACTIONS_CONSTANTS.GET_BOPIS_STORES, getPickupStores);
  yield takeLatest(PICKUP_MODAL_ACTIONS_CONSTANTS.GET_USER_CART_STORES, getUserCartStores);
}

export default PickUpStoreSaga;
