import constants from './StoreDetail.constants';

// TBD: Update actions for container components with contextual ones
export const setNearByStore = payload => ({
  type: constants.SET_SUGGESTED_STORE,
  payload,
});

export const getNearByStore = payload => ({
  type: constants.GET_SUGGESTED_STORE,
  payload,
});

export const getCurrentStoreInfo = payload => ({
  type: constants.GET_CURRENT_STORE,
  payload,
});

export const setCurrentStoreInfo = payload => ({
  type: constants.SET_CURRENT_STORE,
  payload,
});
