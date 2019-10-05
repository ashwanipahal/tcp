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
});
