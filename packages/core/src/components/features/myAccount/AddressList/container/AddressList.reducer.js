import { List } from 'immutable';
import ADDRESS_BOOK_CONSTANTS from '../AddressList.constants';

const initialState = List();

const AddressListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_LIST:
      return List(action.addressList);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Array) {
        return List(state);
      }
      return state;
  }
};

export default AddressListReducer;
