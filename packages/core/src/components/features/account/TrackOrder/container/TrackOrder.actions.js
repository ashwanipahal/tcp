import TRACK_ORDER_CONSTANTS from '../TrackOrder.constants';

export const trackOrder = payload => {
  return {
    type: TRACK_ORDER_CONSTANTS.TRACK_ORDER,
    payload,
  };
};

export const setTrackOrderModalMountedState = payload => {
  return {
    type: TRACK_ORDER_CONSTANTS.SET_TRACK_ORDER_MODAL_MOUNTED_STATE,
    payload,
  };
};

export const setOrderDetailInfo = payload => {
  return {
    type: TRACK_ORDER_CONSTANTS.SET_ORDER_DETAIL_INFO,
    payload,
  };
};

export const setError = payload => {
  return {
    type: TRACK_ORDER_CONSTANTS.SET_ERROR_INFO,
    payload,
  };
};

export const setErrorInfoNull = () => {
  return {
    type: TRACK_ORDER_CONSTANTS.SET_ERROR_INFO_NULL,
  };
};
