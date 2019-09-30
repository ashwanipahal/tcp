import React from 'react';
import { shallow } from 'enzyme';
import { OrdersListItem } from '../views/OrdersListItem.view';

describe('OrdersListItem component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      orderItem: {},
    };
    const component = shallow(<OrdersListItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
