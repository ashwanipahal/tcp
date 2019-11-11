import React from 'react';
import { shallow } from 'enzyme';
import { OrderNotificationSTH } from '../OrderNotificationSTH.container';
import OrderNotification from '../../../../views';

describe('OrderNotificationSTH Container', () => {
  const order = {
    orderDate: 'Oct 16, 2019',
    orderNumber: '7000050054',
    orderStatus: 'lbl_orders_statusOrderExpired',
    status: 'order expired',
    currencySymbol: '$',
    orderTotal: '$0',
    orderTracking: 'N/A',
    orderTrackingUrl: 'N/A',
    isEcomOrder: true,
    isBOSSOrder: false,
    isCanadaOrder: false,
  };

  it('should render OrderNotificationContainerSTH', () => {
    const tree = shallow(
      <OrderNotificationSTH
        order={order}
        limitOfDaysToDisplayNotification={30}
        isTransactionNotificationsInMyAccountEnabled
        labels={{}}
      />
    );
    expect(tree.is(OrderNotification)).toBeTruthy();
  });

  it('should render OrderNotificationContainerSTH in empty state', () => {
    const tree = shallow(
      <OrderNotificationSTH
        limitOfDaysToDisplayNotification={30}
        isTransactionNotificationsInMyAccountEnabled={false}
        labels={{}}
      />
    );
    expect(tree.is(OrderNotification)).toBeTruthy();
  });
});
