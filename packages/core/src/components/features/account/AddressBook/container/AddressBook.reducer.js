import { fromJS, List } from 'immutable';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';

const initialState = fromJS({
  isFetching: false,
  list: null,
  error: {},
  showUpdatedNotification: null,
  showUpdatedNotificationOnModal: null,
});

const updateAddressList = (state, action) => {
  let updatedAddressList = state.get('list');
  updatedAddressList = updatedAddressList.filter(item => {
    return item.addressId !== action.payload.addressId[0];
  });
  /* istanbul ignore else */
  if (updatedAddressList.size === 1) {
    let addressObject = updatedAddressList.get(0);
    addressObject = Object.assign({}, addressObject, {
      primary: 'true',
    });
    updatedAddressList = updatedAddressList.set(0, addressObject);
  }
  return List(updatedAddressList);
};

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
                addressId:
                  item.nickName === action.payload.nickName
                    ? action.payload.addressId
                    : item.addressId,
              });
            })
          )
        )
        .set('showUpdatedNotification', 'success');
    case ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED:
      return state.set('error', action.payload).set('showUpdatedNotification', 'error');
    case ADDRESS_BOOK_CONSTANTS.UPDATE_ADDRESS_LIST_ON_DELETE:
      return state
        .set('list', updateAddressList(state, action))
        .set('showUpdatedNotification', 'success');
    case ADDRESS_BOOK_CONSTANTS.UPDATE_ADDRESS_LIST_ON_DELETE_ERR:
      return state
        .set('error', action.payload)
        .set('showUpdatedNotification', null)
        .set('showUpdatedNotificationOnModal', 'error');
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddressBookReducer;
