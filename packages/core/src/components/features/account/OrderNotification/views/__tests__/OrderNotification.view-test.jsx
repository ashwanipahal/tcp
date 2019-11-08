import React from 'react';
import { shallow } from 'enzyme';
import { OrderNotificationVanilla } from '../OrderNotification.view';

describe('OrderNotification component', () => {
  it('should renders correctly ', () => {
    const props = {
      order: {
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
      },
      labels: {},
      limitOfDaysToDisplayNotification: 30,
      isTransactionNotificationsInMyAccountEnabled: true,
    };
    const component = shallow(<OrderNotificationVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders empty state correctly ', () => {
    const component = shallow(
      <OrderNotificationVanilla
        limitOfDaysToDisplayNotification={30}
        isTransactionNotificationsInMyAccountEnabled={false}
        labels={{}}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
