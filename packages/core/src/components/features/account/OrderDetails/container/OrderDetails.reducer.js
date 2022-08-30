import LOGOUT_CONSTANTS from '@tcp/core/src/components/features/account/Logout/LogOut.constants';
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
    case LOGOUT_CONSTANTS.LOGOUT_APP:
      return { ...initialState };
    default:
      return state;
  }
};

export default OrderDetailsDataReducer;
