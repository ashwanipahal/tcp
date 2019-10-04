import React from 'react';
import { shallow } from 'enzyme';
import { OrdersList } from '../OrdersList.view';

describe('OrdersList View component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      ordersListItems: {},
    };
    const component = shallow(<OrdersList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
