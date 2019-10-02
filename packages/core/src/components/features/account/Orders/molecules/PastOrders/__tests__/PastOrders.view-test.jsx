import React from 'react';
import { shallow } from 'enzyme';
import PastOrders from '../views/PastOrders.view';

describe('PastOrders component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      ordersListItems: [],
    };
    const component = shallow(<PastOrders {...props} />);
    expect(component).toMatchSnapshot();
  });
});
