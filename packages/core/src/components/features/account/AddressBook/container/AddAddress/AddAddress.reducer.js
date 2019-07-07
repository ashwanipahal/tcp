import { fromJS } from 'immutable';
import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';

const initialState = fromJS({
  addAddressNotification: false,
});

const AddAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL:
      return state.set('addAddressNotification', true);

    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddAddressReducer;
