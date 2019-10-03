import React from 'react';
import { shallow } from 'enzyme';
import OrderBasicDetails from '../OrderBasicDetails.view';

describe('Order Basic Details component', () => {
  it('should renders correctly', () => {
    const props = {
      OrderDetailsData: {
        orderDate: '2019-09-30 02:21:33.406',
        orderNumber: '7000031141',
      },
      bossMaxDate: '2019-09-30 02:21:33.406',
      OrdersLabels: {},
      className: '',
    };
    const component = shallow(<OrderBasicDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
});
