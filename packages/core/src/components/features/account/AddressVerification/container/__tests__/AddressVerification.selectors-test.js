import { fromJS } from 'immutable';
import {
  getUserAddress,
  getSuggestedAddress,
  getVerificationResult,
} from '../AddressVerification.selectors';
import { ADDRESS_VERIFICATION_REDUCER_KEY } from '../../../../../../constants/reducer.constants';

describe('#AddressVerification selector', () => {
  let storeState;
  const userAddress = { firstName: 'user name' };
  const suggestedAddress = { firstName: 'suggested name' };
  const resultType = 'AS01';
  beforeEach(() => {
    const initialState = fromJS({
      userAddress: null,
      suggestedAddress: null,
      resultType: '',
    });

    const state = initialState
      .set('userAddress', userAddress)
      .set('suggestedAddress', suggestedAddress)
      .set('resultType', resultType);
    storeState = {
      [ADDRESS_VERIFICATION_REDUCER_KEY]: state,
    };
  });

  it('#getUserAddress should return userAddress state', () => {
    expect(getUserAddress(storeState)).toEqual(userAddress);
  });

  it('#getSuggestedAddress should return suggestedAddress state', () => {
    expect(getSuggestedAddress(storeState)).toEqual(suggestedAddress);
  });

  it('#getVerificationResult should return resultType state', () => {
    expect(getVerificationResult(storeState)).toEqual(resultType);
  });
});
