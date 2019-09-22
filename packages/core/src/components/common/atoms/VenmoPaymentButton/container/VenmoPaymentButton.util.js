export const constants = {
  VENMO_NONCE_EXPIRY_TIMEOUT: 3 * 1000 * 60 * 60, // Three hours nonce expiry time
  VENMO_CANCELED: 'VENMO_CANCELED',
  VENMO_STORAGE_KEY: 'vmo',
  VENMO_INPROGRESS_KEY: 'venprog',
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
