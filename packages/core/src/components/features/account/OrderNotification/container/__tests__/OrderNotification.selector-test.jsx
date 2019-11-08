import { fromJS } from 'immutable';

import {
  getOrdersListState,
  getLabels,
  getLastSTHOrder,
  getLastBoss,
  getLastBopis,
} from '../OrderNotification.selectors';

describe('#OrderNotification selector', () => {
  it('OrderNotification selector return', () => {
    const OrdersListState = fromJS({
      ordersList: [],
    });
    const returnedLabels = {};

    const lastSTHOrder = {
      isEcomOrder: true,
    };

    const lastBOSSOrder = {
      isBOSSOrder: true,
    };

    const lastBopis = {
      isBOSSOrder: false,
      isEcomOrder: false,
    };
    const orders = {
      orders: [lastSTHOrder, lastBOSSOrder, lastBopis],
    };

    const state = {
      Orders: OrdersListState,
      Labels: {
        global: {},
      },
    };

    state.Orders = state.Orders.set('ordersList', orders);

    expect(getLastSTHOrder(state)).toEqual(lastSTHOrder);
    expect(getLastBoss(state)).toEqual(lastBOSSOrder);
    expect(getLastBopis(state)).toEqual(lastBopis);
    expect(getLabels(state)).toMatchObject(returnedLabels);
    expect(getOrdersListState(state)).toEqual(orders);
  });
});
