import { fromJS, List } from 'immutable';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import SHIPPING_ADDRESS_CONSTANTS from '../DefaultShippingAddress.constants';

const initialState = fromJS({
  isFetching: false,
  list: null,
  error: {},
  showDefaultShippingSuccessMsg: false,
});

const AddressBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST:
      return state.set('isFetching', true);
    case ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_LIST:
      return state.set('isFetching', false).set('list', List(action.addressList));
    case SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS:
      state.set('showDefaultShippingSuccessMsg', true);
      return state.set(
        'list',
        List(
          state.get('list').map(item => {
            return Object.assign({}, item, {
              primary: item.nickName === action.body.nickName ? 'true' : 'false',
            });
          })
        )
      );
    case SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED:
      state.set('showDefaultShippingSuccessMsg', false);
      return state.set('error', action.error);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddressBookReducer;
