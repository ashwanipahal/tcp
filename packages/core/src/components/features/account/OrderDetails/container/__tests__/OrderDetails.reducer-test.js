import { logout } from '@tcp/core/src/components/features/account/Logout/container/LogOut.actions';
import OrderDetailsDataReducer from '../OrderDetails.reducer';
import { setOrderDetails } from '../OrderDetails.actions';

const initialState = { orderDetailsData: null };
const orderPayload = {};

describe('OrderDetails Reducer', () => {
  it('should return default state', () => {
    const state = OrderDetailsDataReducer(undefined, {});
    expect(state.orderDetailsData).toBeNull();
  });

  it('should return orderDetailsData state', () => {
    const state = OrderDetailsDataReducer(initialState, setOrderDetails(orderPayload));
    expect(state.orderDetailsData).toBe(orderPayload);
  });

  it('should return initial state in case of LOGOUT action', () => {
    const state = OrderDetailsDataReducer(undefined, setOrderDetails(orderPayload));
    const loggedOutState = OrderDetailsDataReducer(state, logout());
    expect(loggedOutState.orderDetailsData).toBeNull();
  });
});
