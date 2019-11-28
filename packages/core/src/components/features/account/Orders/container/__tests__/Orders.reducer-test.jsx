import { fromJS } from 'immutable';
import { logout } from '@tcp/core/src/components/features/account/Logout/container/LogOut.actions';
import ORDERS_CONSTANTS from '../../Orders.constants';
import OrdersReducer from '../Orders.reducer';

describe('Orders reducer', () => {
  const payload = [
    {
      estimatedPointsEarned: '20',
      isDomOrder: true,
      orderDate: 'September 15, 2019',
      orderNumber: '5000085410',
      orderStatus: 'Order In Process',
      orderStoreNumber: '1',
      orderTotal: '$20.23',
      orderTrackingNumber: 'N/A',
      orderTrackingURL: '#',
      orderType: 'USECOM',
    },
  ];

  it('should return empty Orders List as default state', () => {
    expect(OrdersReducer(undefined, {}).get('ordersList')).toBeNull();
  });

  it('should handle default Orders List', () => {
    const initialState = fromJS({
      pointsHistoryData: null,
    });
    const updatedState = OrdersReducer(initialState, {
      type: ORDERS_CONSTANTS.SET_ORDERS_LIST,
      payload,
    });
    expect(updatedState.get('ordersList')).toEqual(payload);
  });

  it('should return initial state in case of LOGOUT action', () => {
    const state = OrdersReducer(undefined, {
      type: ORDERS_CONSTANTS.SET_ORDERS_LIST,
      payload,
    });
    const loggedOutState = OrdersReducer(state, logout());
    expect(loggedOutState.get('ordersList')).toBeNull();
  });
});
