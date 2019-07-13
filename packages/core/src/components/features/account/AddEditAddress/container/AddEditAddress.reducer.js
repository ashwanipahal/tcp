import { fromJS } from 'immutable';
import constants from './AddEditAddress.constants';

const initialState = fromJS(null);

const AddAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_USER_ADDRESS_FAIL:
      return fromJS(action.payload);
    case constants.ADD_USER_ADDRESS_SUCCESS:
      return fromJS(action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(null);
      }
      return state;
  }
};

export default AddAddressReducer;
