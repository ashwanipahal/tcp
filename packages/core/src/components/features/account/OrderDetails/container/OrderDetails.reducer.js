import ORDERDETAILS_CONSTANTS from '../OrderDetails.constants';

const initialState = {
  orderDetailsData: null,
  isFetching: false,
};

const OrderDetailsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERDETAILS_CONSTANTS.SHOW_LOADER:
      Object.assign(state, {
        isFetching: true,
      });
      return { ...state };

    case ORDERDETAILS_CONSTANTS.SET_ORDERDETAILS:
      Object.assign(state, {
        isFetching: false,
      });
      return { ...state, ...{ orderDetailsData: action.payload } };
    default:
      return state;
  }
};

export default OrderDetailsDataReducer;
