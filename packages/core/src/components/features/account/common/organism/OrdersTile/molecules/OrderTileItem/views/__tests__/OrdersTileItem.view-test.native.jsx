import React from 'react';
import { shallow } from 'enzyme';
import { OrdersTileItem } from '../OrdersTileItem.view.native';

describe('OrdersTileItem component', () => {
  it('should render correctly', () => {
    const labels = {};
    const orderItem = {
      currencySymbol: '$',
      isBOSSOrder: false,
      isCanadaOrder: false,
      isEcomOrder: true,
      orderDate: 'Oct 6, 2019',
      orderNumber: '7000037172',
      orderStatus: 'lbl_orders_statusNa',
      orderTotal: '$24.95',
    };
    const component = shallow(<OrdersTileItem labels={labels} orderItem={orderItem} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const labels = {};
    const orderItem = {};
    const component = shallow(<OrdersTileItem labels={labels} orderItem={orderItem} />);
    expect(component).toMatchSnapshot();
  });
});
