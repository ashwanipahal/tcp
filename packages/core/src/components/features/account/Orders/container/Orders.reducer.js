import { fromJS } from 'immutable';
import constants from '../Orders.constants';

const initialState = fromJS({
  ordersList: null,
});

const OrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_ORDERS_LIST:
      return state.set('ordersList', action.payload);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default OrdersReducer;
