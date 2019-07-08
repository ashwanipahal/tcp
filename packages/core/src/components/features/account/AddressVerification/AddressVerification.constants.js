const ADDRESS_VERIFICATION_CONSTANTS = {
  verifyAddressStateKey: 'addressVerification',
  VERIFY_ADDRESS: 'VERIFY_ADDRESS',
  VERIFY_ADDRESS_SUCCESS: 'VERIFY_ADDRESS_SUCCESS',
  VERIFY_ADDRESS_ERROR: 'VERIFY_ADDRESS_ERROR',
  RESET_VERIFY_ADDRESS: 'RESET_VERIFY_ADDRESS',
  VERIFY_ADDRESS_RESULT: {
    VALID: 'valid',
    INVALID: 'invalid',
    INVALID_ERROR: 'invalidError',
    APARTMENT_MISSING: 'apartmentMissing',
    ERROR: 'error',
  },
  VERIFY_ADDRESS_STATUS_MAP: {
    AS01: 'valid',
    AE09: 'apartmentMissing',
    AE10: 'invalidError',
    AE11: 'invalidError',
    AE12: 'invalidError',
    ERROR: 'error',
    DEFAULT: 'invalid',
  },
  SHIPPINGANDBILLING: 'ShippingAndBilling',
};

export default ADDRESS_VERIFICATION_CONSTANTS;
