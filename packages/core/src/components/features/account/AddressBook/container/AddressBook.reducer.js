import { fromJS, List } from 'immutable';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';

const initialState = fromJS({
  isFetching: false,
  list: null,
  error: {},
  showDefaultShippingUpdatedMsg: null,
  addAddressLoaded: false,
});

const AddressBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST:
      return state.set('isFetching', true);
    case ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_LIST:
      return state.set('isFetching', false).set('list', List(action.addressList));
    case ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS:
      return state
        .set(
          'list',
          List(
            state.get('list').map(item => {
              return Object.assign({}, item, {
                primary: item.nickName === action.payload.nickName ? 'true' : 'false',
              });
            })
          )
        )
        .set('showDefaultShippingUpdatedMsg', true);
    case ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED:
      return state.set('error', action.payload).set('showDefaultShippingUpdatedMsg', false);
    case ADDRESS_BOOK_CONSTANTS.LOAD_ADD_ADDRESS_COMPONENT:
      return state.set('addAddressLoaded', true);
    case ADDRESS_BOOK_CONSTANTS.LOAD_ADDRESSBOOK_COMPONENT:
      return state.set('addAddressLoaded', false);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddressBookReducer;
