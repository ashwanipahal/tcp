import React from 'react';
import { shallow } from 'enzyme';
import { EmptyOrdersList } from '../views/EmptyOrdersList.view';

describe('EmptyOrdersList component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<EmptyOrdersList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
