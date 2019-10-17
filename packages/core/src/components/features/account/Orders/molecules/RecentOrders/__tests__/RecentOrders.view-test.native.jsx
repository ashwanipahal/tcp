import React from 'react';
import { shallow } from 'enzyme';
import { RecentOrders } from '../views/RecentOrders.view.native';

describe('RecentOrders component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      ordersListItems: [],
    };
    const component = shallow(<RecentOrders {...props} />);
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
      ],
      router: {},
    };
    const component = shallow(<RecentOrders {...props} />);
    expect(component).toMatchSnapshot();
  });
});
