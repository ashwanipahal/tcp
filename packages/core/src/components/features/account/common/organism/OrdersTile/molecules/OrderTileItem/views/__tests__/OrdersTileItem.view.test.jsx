import React from 'react';
import { shallow } from 'enzyme';
import { OrdersTileItem } from '../OrdersTileItem.view';

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
      orderTracking: 'N/A',
      orderTrackingUrl:
        'https://childrensplace.narvar.com/childrensplace/tracking/ups?order_number=7000037172&order_date=2019-10-04T07:22:00-04:00&dzip=10036&locale=en_US&type=p',
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
