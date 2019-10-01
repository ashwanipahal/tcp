import { fromJS } from 'immutable';
import ORDERDETAILS_CONSTANTS from '../OrderDetails.constants';

const initialState = fromJS({
  orderDetailsData: null,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const OrderDetailsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERDETAILS_CONSTANTS.SET_ORDERDETAILS_LIST:
      return state.set('orderDetailsData', action.payload);
    default:
      return getDefaultState(state);
  }
};

export default OrderDetailsDataReducer;
