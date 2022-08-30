import constants from '../AddressVerification.constants';

export const verifyAddress = payload => ({
  type: constants.VERIFY_ADDRESS,
  payload,
});

export const verifyAddressSuccess = payload => ({
  type: constants.VERIFY_ADDRESS_SUCCESS,
  suggestedAddress: payload.suggestedAddress,
  resultType: payload.resultType,
});

export const verifyAddressError = payload => ({
  type: constants.VERIFY_ADDRESS_ERROR,
  resultType: payload.resultType,
});

export const resetVerifyAddress = () => ({
  type: constants.RESET_VERIFY_ADDRESS,
});
