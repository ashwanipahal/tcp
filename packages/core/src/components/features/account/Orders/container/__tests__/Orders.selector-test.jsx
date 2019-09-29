import { fromJS } from 'immutable';
import getOrdersListState from '../Orders.selectors';

describe('#pointsHistoryData selector', () => {
  it('#getOrdersListState should return OrdersListState state', () => {
    const OrdersListState = fromJS({
      ordersList: [],
    });
    const state = {
      Orders: OrdersListState,
    };

    expect(getOrdersListState(state)).toEqual(OrdersListState.get('ordersList'));
  });
});
