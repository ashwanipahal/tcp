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
