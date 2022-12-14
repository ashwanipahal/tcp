import { fromJS, List } from 'immutable';
import LOGOUT_CONSTANTS from '@tcp/core/src/components/features/account/Logout/LogOut.constants';
import ADDRESS_BOOK_CONSTANTS from '../AddressBook.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  isFetching: false,
  list: null,
  error: {},
  showDefaultShippingUpdatedMsg: null,
  showUpdatedNotification: null,
  showUpdatedNotificationOnModal: null,
  deleteModalMountedState: false,
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
  return updatedAddressList;
};

const getDefaultState = (state, action) => {
  if (action.type === LOGOUT_CONSTANTS.LOGOUT_APP) {
    return initialState;
  }
  if (action.type === ADDRESS_BOOK_CONSTANTS.CLEAR_ERROR_STATE) {
    return state.set('showUpdatedNotificationOnModal', null);
  }
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const setAddressList = (state, action) => {
  return state
    .set('isFetching', false)
    .set('list', List(action.addressList))
    .set(
      DEFAULT_REDUCER_KEY,
      action.fromProfile ? null : setCacheTTL(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST_TTL)
    );
};

const setDefaultShippingAddress = (state, action) => {
  return state
    .set(
      'list',
      List(
        state.get('list').map(item => {
          return Object.assign({}, item, {
            primary: item.nickName === action.payload.nickName ? 'true' : 'false',
            addressId:
              item.nickName === action.payload.nickName ? action.payload.addressId : item.addressId,
          });
        })
      )
    )
    .set('showUpdatedNotification', 'success');
};

const AddressBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_BOOK_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_LIST:
      return setAddressList(state, action);
    case ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS:
      return setDefaultShippingAddress(state, action);
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
    case ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_BOOK_NOTIFICATION:
      return state.set('showUpdatedNotification', action.payload.status);
    case ADDRESS_BOOK_CONSTANTS.DELETE_MODAL_MOUNTED_STATE:
      return state.set('deleteModalMountedState', action.payload.state);
    case ADDRESS_BOOK_CONSTANTS.CLEAR_GET_ADDRESS_LIST_TTL:
      return state.set(DEFAULT_REDUCER_KEY, null);
    default:
      return getDefaultState(state, action);
  }
};

export default AddressBookReducer;
