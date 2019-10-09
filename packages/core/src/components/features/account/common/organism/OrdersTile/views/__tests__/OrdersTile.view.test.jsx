import React from 'react';
import { shallow } from 'enzyme';
import { OrdersTile } from '../OrdersTile.view';

describe('OrdersTile component', () => {
  it('should render correctly', () => {
    const labels = {};
    const ordersList = {
      orders: [
        {
          currencySymbol: '$',
          isBOSSOrder: false,
          isCanadaOrder: false,
          isEcomOrder: true,
          orderDate: 'Oct 6, 2019',
          orderNumber: '7000037170',
          orderStatus: 'lbl_orders_statusNa',
          orderTotal: '$24.95',
          orderTracking: 'N/A',
        },
        {
          currencySymbol: '$',
          isBOSSOrder: false,
          isCanadaOrder: false,
          isEcomOrder: true,
          orderDate: 'Oct 4, 2019',
          orderNumber: '7000037171',
          orderStatus: 'lbl_orders_statusNa',
          orderTotal: '$24.959',
          orderTracking: 'N/A',
        },
        {
          currencySymbol: '$',
          isBOSSOrder: false,
          isCanadaOrder: false,
          isEcomOrder: true,
          orderDate: 'Oct 14, 2019',
          orderNumber: '7000037172',
          orderStatus: 'lbl_orders_statusNa',
          orderTotal: '$248.95',
          orderTracking: 'N/A',
        },
      ],
    };
    const component = shallow(<OrdersTile labels={labels} ordersList={ordersList} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const labels = {};
    const ordersList = {
      orders: [],
    };
    const component = shallow(<OrdersTile labels={labels} ordersList={ordersList} />);
    expect(component).toMatchSnapshot();
  });
});
