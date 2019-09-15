export const constants = {
  VENMO_NONCE_EXPIRY_TIMEOUT: 3 * 1000 * 60 * 60, // Three hours nonce expiry time
  VENMO_CANCELED: 'VENMO_CANCELED',
};

export const modes = {
  CLIENT_TOKEN: 'client_token',
  PAYMENT_TOKEN: 'payment_token',
};

export const VENMO_USER_STATES = {
  GUEST: 'G',
  REGISTERED: 'R',
};

export const noop = () => {};

/**
 * Runs promises in a serial in lieu of parallel like in Promises.all()
 * @param funcs
 * @return {*}
 */
export const runPromisesInSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(results => Promise.resolve(func()).then(result => [...results, result])),
    Promise.resolve([])
  );

/**
 * Mainly used to check for Venmo nonce expiry
 * @param state
 */
export function isVenmoNonceNotExpired() {
  return true;
  // const venmoData = getVenmoData(state);
  // const expiry = constants.VENMO_NONCE_EXPIRY_TIMEOUT;
  // const {
  //   nonce,
  //   timestamp,
  //   venmoClientTokenData: { venmoPaymentTokenAvailable },
  // } = venmoData || { venmoClientTokenData: {} };
  // return venmoPaymentTokenAvailable === 'TRUE' || (nonce && Date.now() - timestamp <= expiry);
}
