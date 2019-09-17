/* istanbul ignore file */
import STORE_LOCATOR_CONSTANTS from './StoreLocator.constants';

export function getSetDefaultStoreActn(payload) {
  return {
    payload,
    type: STORE_LOCATOR_CONSTANTS.SET_DEFAULT_STORE,
  };
}

export function getSetGeoDefaultStoreActn(payload) {
  return {
    payload,
    type: STORE_LOCATOR_CONSTANTS.SET_GEO_DEFAULT_STORE,
  };
}

export function getFavoriteStore(payload) {
  return {
    payload,
    type: STORE_LOCATOR_CONSTANTS.GET_FAVORITE_STORE,
  };
}

export function getStoresByCoordinates(payload) {
  return {
    payload,
    type: STORE_LOCATOR_CONSTANTS.GET_LOCATION_STORES,
  };
}

export function setStoresByCoordinates(payload) {
  return {
    payload,
    type: STORE_LOCATOR_CONSTANTS.STORES_SET_SUGGESTED_STORES,
  };
}
