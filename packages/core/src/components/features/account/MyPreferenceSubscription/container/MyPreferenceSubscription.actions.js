import MY_PREFERENCE_CONSTANTS from '../MyPreferenceSubscription.constants';

export const getSubscribeStore = payload => {
  return {
    type: MY_PREFERENCE_CONSTANTS.GET_SUBSCRIBE_STORE,
    payload,
  };
};

export const setSubscribeStore = subscribeStoreData => {
  return {
    type: MY_PREFERENCE_CONSTANTS.SET_SUBSCRIBE_STORE,
    payload: subscribeStoreData,
  };
};

export const setBrandSubscribeData = subscribeData => {
  return {
    type: MY_PREFERENCE_CONSTANTS.SET_BRAND_SUBSCRIBE_DATA,
    payload: subscribeData,
  };
};
