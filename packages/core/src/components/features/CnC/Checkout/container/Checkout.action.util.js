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

export const setIsRTPSFlow = payload => ({
  type: constants.SET_IS_RTPS_FLOW,
  payload,
});

export const submitAcceptOrDeclinePlccOffer = payload => ({
  type: constants.SUBMIT_ACCEPT_DECLINE_PLCC_OFFER,
  payload,
});

/**
 * @function updateCardData
 *  @param { object } payload
 * action creator for type: UPDATE_CARD_DATA
 */
export const updateCardData = payload => ({ payload, type: constants.UPDATE_CARD_DATA });

export const initCheckoutSectionPageAction = payload => ({
  type: constants.INIT_CHECKOUT_SECTION_PAGE,
  payload,
});

export const toggleCountrySelectorModal = payload => ({
  payload,
  type: constants.COUNTRY_SELECTOR_MODAL_TOGGLE,
});

/**
 * @function initIntlCheckoutAction
 *  @param { object } payload
 * action creator for type: INIT_INTL_CHECKOUT
 */
export const initIntlCheckoutAction = payload => ({
  type: constants.INIT_INTL_CHECKOUT,
  payload,
});
/**
 * @function getSetIntlUrl
 *  @param { object } internationalUrl
 * action creator for type: CHECKOUT_ORDER_OPTIONS_SET_INTL_URL
 */
export const getSetIntlUrl = internationalUrl => {
  return {
    internationalUrl,
    type: 'CHECKOUT_ORDER_OPTIONS_SET_INTL_URL',
  };
};

export const getSetGiftWrapValuesActn = payload => {
  return {
    payload,
    type: constants.CHECKOUT_VALUES_SET_GIFTWRAP,
  };
};

export const resetAddGiftCardSuccess = payload => {
  return {
    type: constants.RESET_ADD_GIFT_CARD_SUCCESS,
    payload,
  };
};

export const toggleCheckoutRouting = payload => ({
  payload,
  type: constants.CHECKOUT_ROUTING_DONE,
});

export const setUpdateFromMSG = payload => ({
  type: constants.CHECKOUT_FLAGS_SET_PICKUP_UPDATE_FOR_MSG,
  payload,
});

/**
 * @function initCheckoutAction
 * action creator for type: INIT_CHECKOUT
 */
export const initCheckoutAction = (router, isPaypalFlow, navigation) => ({
  type: constants.INIT_CHECKOUT,
  router,
  isPaypalFlow,
  navigation,
});
