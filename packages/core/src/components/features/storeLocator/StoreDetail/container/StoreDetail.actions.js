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

export function setModuleXContent(payload) {
  return {
    payload,
    type: constants.SET_MODULEX_CONTENT,
  };
}

export function getModuleXContent(payload) {
  return {
    payload,
    type: constants.GET_MODULEX_CONTENT,
  };
}

export function getDistance(payload) {
  return {
    payload,
    type: constants.GET_DISTANCE,
  };
}

export function setDistance(payload) {
  return {
    payload,
    type: constants.SET_DISTANCE,
  };
}
