import constants from '../AddressVerification.constants';

export const verifyAddress = payload => ({
  type: constants.VERIFY_ADDRESS,
  payload,
});

export const verifyAddressSuccess = (suggestedAddress, resultType) => ({
  type: constants.VERIFY_ADDRESS_SUCCESS,
  suggestedAddress,
  resultType,
});

export const resetVerifyAddress = () => ({
  type: constants.RESET_VERIFY_ADDRESS,
});
