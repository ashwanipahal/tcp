import React from 'react';
import { shallow } from 'enzyme';
import OrderBasicDetails from '../OrderBasicDetails.view';

describe('Order Basic Details component', () => {
  it('should renders correctly', () => {
    const props = {
      orderDetailsData: {
        orderDate: '2019-09-30 02:21:33.406',
        orderNumber: '70000311411',
      },
      bossMaxDate: '2019-09-30 02:21:33.406',
      ordersLabels: {},
      className: '',
      pickUpExpirationDate: '2019-10-30 02:29:34.231',
    };
    const component = shallow(<OrderBasicDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
});
