import { fromJS, List } from 'immutable';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';

const initialState = fromJS({
  isFetching: false,
  list: null,
});

const AddressBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST:
      return state.set('isFetching', true);
    case ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_LIST:
      return state.set('isFetching', false).set('list', List(action.addressList));
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddressBookReducer;
