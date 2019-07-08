import { fromJS } from 'immutable';
import ADDRESS_VERIFICATION_CONSTANTS from '../AddressVerification.constants';

const initialState = fromJS({
  userAddress: null,
  suggestedAddress: null,
  resultType: '',
});

const AddressVerificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS:
      return state
        .set('userAddress', action.payload)
        .set('resultType', null)
        .set('suggestedAddress', '');
    case ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS_SUCCESS:
      return state
        .set('suggestedAddress', action.suggestedAddress)
        .set('resultType', action.resultType);
    case ADDRESS_VERIFICATION_CONSTANTS.RESET_VERIFY_ADDRESS:
      return state
        .set('userAddress', null)
        .set('suggestedAddress', null)
        .set('resultType', '');
    case ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS_ERROR:
      return state
        .set('userAddress', null)
        .set('suggestedAddress', null)
        .set('resultType', 'ERROR');
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddressVerificationReducer;
