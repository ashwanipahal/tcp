import React from 'react';
import { shallow } from 'enzyme';
import { RecentOrders } from '../views/RecentOrders.view';

describe('RecentOrders component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      ordersListItems: [],
    };
    const component = shallow(<RecentOrders {...props} />);
    expect(component).toMatchSnapshot();
  });
});
