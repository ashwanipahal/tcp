import React from 'react';
import { shallow } from 'enzyme';
import Badge from '../views/Badge.native';

describe('Native Badge component', () => {
  it('renders correctly with  as false', () => {
    const component = shallow(<Badge>Shipping</Badge>);
    expect(component).toMatchSnapshot();
  });
});
