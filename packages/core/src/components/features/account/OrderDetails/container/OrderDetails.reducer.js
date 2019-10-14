import ORDERDETAILS_CONSTANTS from '../OrderDetails.constants';

const initialState = {
  orderDetailsData: null,
};

const OrderDetailsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERDETAILS_CONSTANTS.SET_ORDERDETAILS:
      return { ...state, ...{ orderDetailsData: action.payload } };
    default:
      return state;
  }
};

export default OrderDetailsDataReducer;
