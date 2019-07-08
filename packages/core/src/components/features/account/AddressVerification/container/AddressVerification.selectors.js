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
