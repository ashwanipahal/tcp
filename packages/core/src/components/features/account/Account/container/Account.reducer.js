import { fromJS, List } from 'immutable';
import ACCOUNT_CONSTANTS from '../Account.constants';
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

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case ACCOUNT_CONSTANTS.SET_ACCOUNT_NAVIGATION_LIST:
      return state
        .set('accountNavigation', action)
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(ACCOUNT_CONSTANTS.GET_ADDRESS_LIST_TTL));
    case ACCOUNT_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS:
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
    case ACCOUNT_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED:
      return state.set('error', action.payload).set('showUpdatedNotification', 'error');
    case ACCOUNT_CONSTANTS.UPDATE_ADDRESS_LIST_ON_DELETE:
      return state
        .set('list', updateAddressList(state, action))
        .set('showUpdatedNotification', 'success');
    case ACCOUNT_CONSTANTS.UPDATE_ADDRESS_LIST_ON_DELETE_ERR:
      return state
        .set('error', action.payload)
        .set('showUpdatedNotification', null)
        .set('showUpdatedNotificationOnModal', 'error');
    case ACCOUNT_CONSTANTS.SET_ADDRESS_BOOK_NOTIFICATION:
      return state.set('showUpdatedNotification', action.payload.status);
    case ACCOUNT_CONSTANTS.DELETE_MODAL_MOUNTED_STATE:
      return state.set('deleteModalMountedState', action.payload.state);
    case ACCOUNT_CONSTANTS.CLEAR_GET_ADDRESS_LIST_TTL:
      return state.set(DEFAULT_REDUCER_KEY, null);
    default:
      return getDefaultState(state);
  }
};

export default AccountReducer;
