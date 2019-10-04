import { fromJS } from 'immutable';
import constants from './AddEditAddress.constants';

const initialState = fromJS({
  showNotification: false,
  error: null,
});

const AddAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_USER_ADDRESS_FAIL:
      return state.set('error', fromJS(action.payload)).set('showNotification', true);
    case constants.ADD_USER_ADDRESS_SUCCESS:
      return fromJS(action.payload);
    case constants.RESET_ADDRESS_STATE:
      return initialState;
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddAddressReducer;
