const ADDRESS_VERIFICATION_CONSTANTS = {
  verifyAddressStateKey: 'addressVerification',
  VERIFY_ADDRESS: 'VERIFY_ADDRESS',
  VERIFY_ADDRESS_SUCCESS: 'VERIFY_ADDRESS_SUCCESS',
  RESET_VERIFY_ADDRESS: 'RESET_VERIFY_ADDRESS',
  VERIFY_ADDRESS_RESULT: {
    VALID: 'valid',
    INVALID: 'invalid',
    INVALID_ERROR: 'invalidError',
    APARTMENT_MISSING: 'apartmentMissing',
  },
  STATUS: {
    AE09:
      'There may be an issue with your address as entered. Please double check it, or if you believe the address is correct you can continue to the next step.',
    AE10: 'The house / building number is not valid. Please review and confirm your address.',
    AE11:
      'The house / building number is missing from your address. Please review and confirm your address.',
    AE12: 'The house / building number is not valid. Please review and confirm your address.',
    DEFAULT:
      'There may be an issue with your address as entered. Please double check it, or select from the below.',
  },
  SHIPPINGANDBILLING: 'ShippingAndBilling',
};

export default ADDRESS_VERIFICATION_CONSTANTS;
