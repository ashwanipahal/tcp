export const constants = {
  VENMO_NONCE_EXPIRY_TIMEOUT: 3 * 1000 * 60 * 60, // Three hours nonce expiry time
  VENMO_CANCELED: 'VENMO_CANCELED',
  VENMO_STORAGE_KEY: 'vmo',
  VENMO_INPROGRESS_KEY: 'venprog',
  VENMO_PICKUP_BANNER: 'ven_pickup_banner',
  VENMO_SHIPPING_BANNER: 'ven_shipping_banner',
  VENMO: 'VENMO',
};

export const modes = {
  CLIENT_TOKEN: 'client_token',
  PAYMENT_TOKEN: 'payment_token',
};

export const VENMO_USER_STATES = {
  GUEST: 'G',
  REGISTERED: 'R',
};

/**
 * Venmo Mock Data to test venmo functionality without venmo app
 */
export const VENMO_MOCK_DATA = {
  details: { username: 'gagandsb' },
  username: 'gagandsb',
  deviceData: '523d2ff2f87421afab351d7447afafab',
  error: null,
  nonce: 'fake-venmo-account-nonce', // Lower Environment Nonce provided by Venmo
  supportedByBrowser: true,
  timestamp: Date.now(),
  type: 'VenmoAccount',
};
