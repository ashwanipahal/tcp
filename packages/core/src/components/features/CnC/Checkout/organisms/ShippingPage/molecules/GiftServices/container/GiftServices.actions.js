import GIFT_SERVICES_CONSTANTS from '../GiftServices.constants';

// @flow
export const addGiftServicesRequest = () => {
  return {
    type: GIFT_SERVICES_CONSTANTS.ADD_GIFT_SERVICES_REQUEST,
  };
};

export const removeAirmilesBannerGiftServicesRequest = () => {
  return {
    type: GIFT_SERVICES_CONSTANTS.REMOVE_GIFT_SERVICES_REQUEST,
  };
};
export const addGiftServicesFailure = (payload: {}) => {
  return {
    type: GIFT_SERVICES_CONSTANTS.ADD_GIFT_SERVICES_FAILED,
    payload,
  };
};
