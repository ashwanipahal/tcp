import { fromJS } from 'immutable';
import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';

const initialState = fromJS({
  addAddressSuccess: false,
  error: {},
  showMessageForAddAddressMsg: false,
});

const AddAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_SUCCESS:
      return state.set('success', action.payload).set('showMelisaCallSuccess', true);
    case ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL:
      return state.set('showMessageForAddAddressMsg', true);

    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddAddressReducer;
