import { ORDERDETAILS_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { getOrderDetailsDataState, getOrdersLabels } from '../OrderDetails.selectors';

describe('#My Profile Selectors', () => {
  it('#getOrderDetailsDataState should return OrdersListState state', () => {
    const orderDetailsData = {};
    const state = {
      [ORDERDETAILS_REDUCER_KEY]: {
        orderDetailsData: {},
      },
    };
    expect(getOrderDetailsDataState(state)).toEqual(orderDetailsData);
  });

  it('#getOrdersLabels should return orders label state', () => {
    const orders = {};
    const state = {
      Labels: {
        account: {
          orders: {},
        },
      },
    };
    expect(getOrdersLabels(state)).toEqual(orders);
  });
});
