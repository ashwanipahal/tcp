import React from 'react';
import { shallow } from 'enzyme';
import OrderBasicDetails from '../OrderBasicDetails.view';

describe('Order Basic Details component ', () => {
  it('should render correctly for ECOM order', () => {
    const props = {
      orderDetailsData: {
        orderDate: '2018-09-30 02:21:33.406',
        orderNumber: '70000310001',
      },
      ordersLabels: {},
      className: '',
    };
    const component = shallow(<OrderBasicDetails {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly for Boss order', () => {
    const props = {
      orderDetailsData: {
        orderDate: '2019-10-12 02:21:33.406',
        orderNumber: '70000311411',
      },
      bossMaxDate: '2019-10-30 02:21:33.406',
      bossMinDate: '2019-10-11 02:21:33.406',
      ordersLabels: {},
      className: '',
      pickUpExpirationDate: '2019-10-30 02:29:34.231',
    };
    const component = shallow(<OrderBasicDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
});
