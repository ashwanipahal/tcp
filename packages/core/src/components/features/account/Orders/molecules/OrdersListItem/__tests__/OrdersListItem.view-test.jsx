import React from 'react';
import { shallow } from 'enzyme';
import { OrdersListItemvanilla } from '../views/OrdersListItem.view';

describe('OrdersListItem component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      orderItem: {},
    };
    const component = shallow(<OrdersListItemvanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
