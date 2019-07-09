import { fromJS } from 'immutable';
import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';

const initialState = fromJS(null);

const AddAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL:
      return fromJS(action.payload);
    case ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_SUCCESS:
      return fromJS(action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(null);
      }
      return state;
  }
};

export default AddAddressReducer;
