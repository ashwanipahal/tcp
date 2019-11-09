import { fromJS } from 'immutable';
import LOGOUT_CONSTANTS from '@tcp/core/src/components/features/account/Logout/LogOut.constants';
import constants from '../Orders.constants';

const initialState = fromJS({
  ordersList: null,
  isFetching: false,
});

const OrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SHOW_LOADER:
    case constants.GET_ORDERS_LIST:
      return state.set('isFetching', true);
    case constants.SET_ORDERS_LIST:
      return state.set('isFetching', false).set('ordersList', action.payload);
    case LOGOUT_CONSTANTS.LOGOUT_APP:
      return initialState;
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default OrdersReducer;
