import React from 'react';
import { shallow } from 'enzyme';
import PastOrders from '../views/PastOrders.view.native';

describe('PastOrders component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      ordersListItems: [],
    };
    const component = shallow(<PastOrders {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly', () => {
    const props = {
      labels: {},
      ordersListItems: [
        {
          currencySymbol: '$',
          isBOSSOrder: false,
          isCanadaOrder: false,
          isEcomOrder: true,
          orderDate: 'Oct 4, 2019',
          orderNumber: '7000037172',
          orderStatus: 'lbl_orders_statusNa',
          orderTotal: '$24.95',
          orderTracking: 'N/A',
          orderTrackingUrl:
            'https://childrensplace.narvar.com/childrensplace/tracking/ups?order_number=7000037172&order_date=2019-10-04T07:22:00-04:00&dzip=10036&locale=en_US&type=p',
        },
        {
          currencySymbol: '$',
          isBOSSOrder: false,
          isCanadaOrder: false,
          isEcomOrder: true,
          orderDate: 'Oct 4, 2019',
          orderNumber: '7000036213',
          orderStatus: 'lbl_orders_statusNa',
          orderTotal: '$83.45',
          orderTracking: 'N/A',
          orderTrackingUrl:
            'https://childrensplace.narvar.com/childrensplace/tracking/ups?order_number=7000036213&order_date=2019-10-04T07:17:00-04:00&dzip=10036&locale=en_US&type=p',
        },
      ],
      handleComponentChange: jest.fn(),
    };
    const component = shallow(<PastOrders {...props} />);
    expect(component).toMatchSnapshot();
  });
});
