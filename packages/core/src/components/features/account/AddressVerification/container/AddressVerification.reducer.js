import { fromJS } from 'immutable';
import ADDRESS_VERIFICATION_CONSTANTS from '../AddressVerification.constants';

const initialState = fromJS({
  userAddress: null,
  suggestedAddress: null,
  result: null,
});

const AddressVerificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS:
      return state
        .set('userAddress', action.payload)
        .set('result', null)
        .set('suggestedAddress', null);
    case ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS_SUCCESS:
      return state
        .set('suggestedAddress', action.suggestedAddress)
        .set('result', action.resultType);
    case ADDRESS_VERIFICATION_CONSTANTS.RESET_VERIFY_ADDRESS:
      return state
        .set('userAddress', null)
        .set('suggestedAddress', null)
        .set('result', null);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddressVerificationReducer;
