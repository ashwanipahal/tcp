import CONFIRMATION_CONSTANTS from '../Confirmation.constants';

/**
 * @function getSetOrderConfirmationActn
 * @param { object } orderConfirmation
 * action creator for type: CONFIRMATION_SET_ORDER_CONFIRMATION
 */
export function getSetOrderConfirmationActn(orderConfirmation) {
  return {
    orderConfirmation,
    type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_ORDER_CONFIRMATION,
  };
}

/**
 * @function getSetCouponsValuesActn
 * @param { array } couponsInfo
 * action creator for type: CONFIRMATION_VALUES_COUPONS_SET
 */
export function getSetCouponsValuesActn(couponsInfo) {
  return {
    couponsInfo,
    type: CONFIRMATION_CONSTANTS.CONFIRMATION_VALUES_COUPONS_SET,
  };
}

/**
 * @function getSetOrderProductDetails
 * @param { object } orderProducts
 * action creator for type: CONFIRMATION_SET_ORDER_PRODUCTS
 */
export function getSetOrderProductDetails(orderProducts) {
  return {
    orderProducts,
    type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_ORDER_PRODUCTS,
  };
}

/**
 * @function setVenmoPaymentConfirmationDisplayed
 * @param { object } payload
 * action creator for type: CONFIRMATION_SET_VENMO_PAYMENT_MESSAGE_DISPLAYED
 */
export function setVenmoPaymentConfirmationDisplayed(payload) {
  return {
    type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_VENMO_PAYMENT_MESSAGE_DISPLAYED,
    payload,
  };
}

/**
 * @function getSetRewardPointsOrderConfActn
 * @param { object } updatedSummary
 * action creator for type: CONFIRMATION_SET_REWARDS_POINTS
 */
export function getSetRewardPointsOrderConfActn(updatedSummary) {
  return {
    updatedSummary,
    type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_REWARDS_POINTS,
  };
}

/**
 * @function fetchUpdateOrderDetailsData
 * @param { String } payload
 * action creator for type: CONFIRMATION_FETCH_UPDATE_ORDER_DETAILS
 */
export function fetchUpdateOrderDetailsData(payload) {
  return {
    payload,
    type: CONFIRMATION_CONSTANTS.CONFIRMATION_FETCH_UPDATE_ORDER_DETAILS,
  };
}

/**
 * @function setUpdateOrderDetailsData
 * @param { object } payload
 * action creator for type: CONFIRMATION_SET_UPDATE_ORDER_DETAILS
 */
export function setUpdateOrderDetailsData(payload) {
  return {
    payload,
    type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_UPDATE_ORDER_DETAILS,
  };
}
/**
 * @function setCreateAccountSuccess
 * action creator for type: CONFIRMATION_SET_CREATE_ACCOUNT_SUCCESS
 */
export const setCreateAccountSuccess = payload => ({
  type: CONFIRMATION_CONSTANTS.CONFIRMATION_SET_CREATE_ACCOUNT_SUCCESS,
  payload,
});
