import STORE_LIST_CONSTANTS from './StoreList.constants';

export function getStoreList(payload) {
  return {
    payload,
    type: STORE_LIST_CONSTANTS.GET_STORE_LIST,
  };
}

export function setStoreList(payload) {
  return {
    payload,
    type: STORE_LIST_CONSTANTS.SET_STORE_LIST,
  };
}
