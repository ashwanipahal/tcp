import React from 'react';
import { shallow } from 'enzyme';
import { OrdersListItemVanilla } from '../views/OrdersListItem.view.native';

describe('OrdersListItem component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      orderItem: {},
    };
    const component = shallow(<OrdersListItemVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly', () => {
    const props = {
      labels: {},
      orderItem: {
        currencySymbol: '$',
        isBOSSOrder: false,
        isCanadaOrder: false,
        isEcomOrder: true,
        orderDate: 'Oct 4, 2019',
        orderNumber: '7000037172',
        orderStatus: 'lbl_orders_statusNa',
        orderTotal: '$24.95',
        orderTracking: 'N/A',
      },
    };
    const component = shallow(<OrdersListItemVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
