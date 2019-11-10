import constants from '../Checkout.constants';

/**
 * @function resetCheckoutReducer
 * action creator for type: RESET_CHECKOUT_REDUCER
 */
export const resetCheckoutReducer = () => {
  return {
    type: constants.RESET_CHECKOUT_REDUCER,
  };
};

export const setServerErrorCheckout = payload => {
  return {
    payload,
    type: constants.SET_SERVER_ERROR_CHECKOUT,
  };
};

export const updateRTPSData = payload => ({
  payload,
  type: constants.UPDATE_RTPS_DATA,
});

export const setIsRTPSFlow = payload => ({
  type: constants.SET_IS_RTPS_FLOW,
  payload
});

export const submitAcceptOrDeclinePlccOffer = (payload) => ({
  type: constants.SUBMIT_ACCEPT_DECLINE_PLCC_OFFER,
  payload
})
