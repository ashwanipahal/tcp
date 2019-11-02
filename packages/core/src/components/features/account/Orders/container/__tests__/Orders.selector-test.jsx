import { fromJS } from 'immutable';
import { getOrdersListState, getOrderListFetchingState } from '../Orders.selectors';

describe('#pointsHistoryData selector', () => {
  it('#getOrdersListState should return OrdersListState state', () => {
    const OrdersListState = fromJS({
      ordersList: [],
    });
    const state = {
      Orders: OrdersListState,
      isFatching: false,
    };

    expect(getOrdersListState(state)).toEqual(OrdersListState.get('ordersList'));

    expect(getOrderListFetchingState(state)).toEqual(OrdersListState.get('isFatching'));
  });
});
