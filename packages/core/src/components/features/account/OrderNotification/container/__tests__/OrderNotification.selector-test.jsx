import { fromJS } from 'immutable';

import {
  getLabels,
  getLastSTHOrder,
  getLastBoss,
  getLastBopis,
} from '../OrderNotification.selectors';

describe('#OrderNotification selector', () => {
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

  it('getLastSTHOrder for last STH Order', () => {
    expect(getLastSTHOrder(state)).toEqual(lastSTHOrder);
  });

  it('getLastBoss for last BOSS Order', () => {
    expect(getLastBoss(state)).toEqual(lastBOSSOrder);
  });

  it('getLastBopis for last BOPIS Order', () => {
    expect(getLastBopis(state)).toEqual(lastBopis);
  });

  it('getLabels', () => {
    expect(getLabels(state)).toMatchObject(returnedLabels);
  });
});
