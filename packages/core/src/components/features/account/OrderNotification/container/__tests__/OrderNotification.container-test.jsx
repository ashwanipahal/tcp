import React from 'react';
import { shallow } from 'enzyme';
import { OrderNotification, mapDispatchToProps } from '../OrderNotification.container';

describe('OrderNotification Container', () => {
  const order = {
    orderDate: 'Oct 16, 2019',
    orderNumber: '7000050054',
    orderStatus: 'lbl_orders_statusOrderExpired',
    status: 'order expired',
    currencySymbol: '$',
    orderTotal: '$0',
    orderTracking: 'N/A',
    orderTrackingUrl: 'N/A',
  };

  it('should render OrderNotificationContainer with empty state', () => {
    const tree = shallow(<OrderNotification labels={{}} />);
    expect(tree.is(React.Fragment)).toBeTruthy();
  });

  it('should render OrderNotification for BOPIS order', () => {
    const tree = shallow(
      <OrderNotification
        orderBOPIS={order}
        limitOfDaysToDisplayNotification={30}
        isTransactionNotificationsInMyAccountEnabled
        labels={{}}
      />
    );
    expect(tree.is(React.Fragment)).toBeTruthy();
  });

  it('should render OrderNotification for BOSS order', () => {
    const tree = shallow(
      <OrderNotification
        orderBOSS={order}
        limitOfDaysToDisplayBossNotification={30}
        isTransactionNotificationsInMyAccountEnabled
        labels={{}}
      />
    );
    expect(tree.is(React.Fragment)).toBeTruthy();
  });

  it('should render OrderNotification for STH order', () => {
    const tree = shallow(
      <OrderNotification
        orderSTH={order}
        limitOfDaysToDisplayNotification={30}
        isTransactionNotificationsInMyAccountEnabled
        labels={{}}
      />
    );
    expect(tree.is(React.Fragment)).toBeTruthy();
  });

  it('should return an action fetchOrders which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchOrders();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
