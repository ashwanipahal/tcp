import { fromJS } from 'immutable';
import addressVerificationReducer from '../AddressVerification.reducer';
import {
  verifyAddress,
  verifyAddressSuccess,
  verifyAddressError,
  resetVerifyAddress,
} from '../AddressVerification.actions';

describe('AddressVerification reducer', () => {
  const initialState = fromJS({
    userAddress: null,
    suggestedAddress: null,
    resultType: '',
  });

  it('should return  default state', () => {
    expect(addressVerificationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle verifyAddress action correctly', () => {
    const userAddress = {};
    const expectedState = initialState.set('userAddress', userAddress);
    expect(addressVerificationReducer(initialState, verifyAddress(userAddress))).toEqual(
      expectedState
    );
  });

  it('should handle verifyAddressSuccess action correctly', () => {
    const suggestedAddress = {};
    const expectedState = initialState
      .set('suggestedAddress', suggestedAddress)
      .set('resultType', 'AS01');
    expect(
      addressVerificationReducer(
        initialState,
        verifyAddressSuccess({ suggestedAddress, resultType: 'AS01' })
      )
    ).toEqual(expectedState);
  });

  it('should handle verifyAddressError action correctly', () => {
    const expectedState = initialState.set('resultType', 'ERROR');
    expect(
      addressVerificationReducer(initialState, verifyAddressError({ resultType: 'ERROR' }))
    ).toEqual(expectedState);
  });

  it('should handle resetVerifyAddress action correctly', () => {
    expect(addressVerificationReducer(initialState, resetVerifyAddress())).toEqual(initialState);
  });
});
