import { createSelector } from 'reselect';
import { ADDRESS_VERIFICATION_REDUCER_KEY } from '../../../../../constants/reducer.constants';

export const getAddressVerificationState = state => state[ADDRESS_VERIFICATION_REDUCER_KEY];

export const getUserAddress = createSelector(
  getAddressVerificationState,
  state => state.get('userAddress')
);

export const getSuggestedAddress = createSelector(
  getAddressVerificationState,
  state => state.get('suggestedAddress')
);

export const getVerificationResult = createSelector(
  getAddressVerificationState,
  state => state.get('resultType')
);

export const getVerifyAddressLabels = state => {
  const {
    lbl_addEditAddress_editAddress: editAddress,
    lbl_addEditAddress_addAddress: addAddressHeading,
    lbl_addEditAddress_addressLine2: addressLine2,
    lbl_addEditAddress_errorMessageAE09: AE09,
    lbl_addEditAddress_errorMessageAE10: AE10,
    lbl_addEditAddress_errorMessageAE11: AE11,
    lbl_addEditAddress_errorMessageAE12: AE12,
    lbl_addEditAddress_errorMessageDefault: defaultErrorMsg,
    lbl_addEditAddress_entered: youEntered,
    lbl_addEditAddress_suggest: weSuggest,
    lbl_addEditAddress_verifyHeader: verifyHeader,
    lbl_addEditAddress_continueCta: continueCta,
  } = state.Labels.global && state.Labels.global.addEditAddress;
  return {
    verifyAddressLabels: {
      AE09,
      AE10,
      AE11,
      AE12,
      defaultErrorMsg,
      youEntered,
      weSuggest,
      verifyHeader,
      continueCta,
      editAddress,
      addAddressHeading,
      addressLine2,
    },
  };
};
