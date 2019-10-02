import React from 'react';
import { shallow } from 'enzyme';
import OrdersLinks from '../views/OrdersLinks.view';

describe('OrdersLinks component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<OrdersLinks {...props} />);
    expect(component).toMatchSnapshot();
  });
});
