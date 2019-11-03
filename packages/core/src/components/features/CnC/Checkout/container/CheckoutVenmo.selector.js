import { CHECKOUT_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import { constants as venmoConstants } from '../../../../common/atoms/VenmoPaymentButton/container/VenmoPaymentButton.util';

export const getVenmoData = state => {
  return state[CHECKOUT_REDUCER_KEY].getIn(['values', 'venmoData']);
};

export const getVenmoClientTokenData = state =>
  state[CHECKOUT_REDUCER_KEY].getIn(['values', 'venmoClientTokenData']);

export const isVenmoPaymentInProgress = state => {
  return state[CHECKOUT_REDUCER_KEY].getIn(['uiFlags', 'venmoPaymentInProgress']);
};

export const isVenmoPickupBannerDisplayed = state => {
  return state[CHECKOUT_REDUCER_KEY].getIn(['uiFlags', 'venmoPickupMessageDisplayed']);
};

export const isVenmoShippingBannerDisplayed = state => {
  return state[CHECKOUT_REDUCER_KEY].getIn(['uiFlags', 'venmoShippingMessageDisplayed']);
};

export const isVenmoPaymentSaveSelected = state =>
  state[CHECKOUT_REDUCER_KEY].getIn(['uiFlags', 'venmoPaymentOptionSave']);

export const getVenmoError = state => {
  const error = state[CHECKOUT_REDUCER_KEY].getIn(['values', 'venmoData', 'error']);
  return error ? error.message : '';
};

/**
 * Mainly used to check for Venmo nonce expiry
 * @param state
 */
export const isVenmoNonceNotExpired = state => {
  const venmoData = getVenmoData(state);
  const expiry = venmoConstants.VENMO_NONCE_EXPIRY_TIMEOUT;
  const { nonce, timestamp } = venmoData;
  const venmoClientTokenData = getVenmoClientTokenData(state);
  const venmoPaymentTokenAvailable = venmoClientTokenData
    ? venmoClientTokenData.venmoPaymentTokenAvailable
    : false;
  return venmoPaymentTokenAvailable === 'TRUE' || (nonce && Date.now() - timestamp <= expiry);
};

export const isVenmoPaymentToken = state => {
  const venmoClientTokenData = getVenmoClientTokenData(state);
  const venmoPaymentTokenAvailable = venmoClientTokenData
    ? venmoClientTokenData.venmoPaymentTokenAvailable
    : false;
  return venmoPaymentTokenAvailable === 'TRUE';
};

export const isVenmoNonceActive = state => {
  const venmoData = getVenmoData(state);
  return (
    venmoData &&
    (venmoData.nonce || isVenmoPaymentToken(state)) &&
    isVenmoPaymentInProgress(state) &&
    isVenmoNonceNotExpired(state)
  );
};

/**
 * @function getVenmoUserName
 * @description Gets the venmo username which is authorized from the app
 */
export const getVenmoUserName = state => {
  const venmoData = getVenmoData(state);
  const { details: { username } = {} } = venmoData || {};
  return username;
};

export function isVenmoPaymentAvailable(state) {
  const venmoData = getVenmoData(state);
  const venmoPaymentInProgress = isVenmoPaymentInProgress(state);
  return venmoData && (venmoData.nonce || isVenmoPaymentToken(state)) && venmoPaymentInProgress;
}
