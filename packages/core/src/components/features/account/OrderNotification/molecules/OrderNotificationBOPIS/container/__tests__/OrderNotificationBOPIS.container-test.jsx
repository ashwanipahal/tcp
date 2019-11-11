import React from 'react';
import { shallow } from 'enzyme';
import { OrderNotificationVanilla } from '../OrderNotificationBOPIS.container';
import OrderNotification from '../../../../views';

describe('OrderNotificationBOPIS Container', () => {
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

  it('should render OrderNotificationContainerBOPIS', () => {
    const tree = shallow(
      <OrderNotificationVanilla
        order={order}
        limitOfDaysToDisplayNotification={30}
        isTransactionNotificationsInMyAccountEnabled
        labels={{}}
      />
    );
    expect(tree.is(OrderNotification)).toBeTruthy();
  });

  it('should render OrderNotificationContainerBOPIS in empty state', () => {
    const tree = shallow(
      <OrderNotificationVanilla
        limitOfDaysToDisplayNotification={30}
        isTransactionNotificationsInMyAccountEnabled={false}
        labels={{}}
      />
    );
    expect(tree.is(OrderNotification)).toBeTruthy();
  });
});
