import { createSelector } from 'reselect';

import ADDRESS_VERIFICATION_CONSTANTS from '../AddressVerification.constants';

export const getAddressVerificationState = state =>
  state[ADDRESS_VERIFICATION_CONSTANTS.verifyAddressStateKey];

export const getUserAddress = createSelector(
  getAddressVerificationState,
  state => state.get('userAddress')
);

export const getSuggestedAddress = createSelector(
  getAddressVerificationState,
  state => state.get('suggestedAddress')
);

export const getModalState = createSelector(
  getAddressVerificationState,
  state => state.get('result')
);
