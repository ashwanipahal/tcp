import React from 'react';
import { shallow } from 'enzyme';
import StoreHours from '../views/StoreHours.native';

describe('StoreHours component', () => {
  it('StoreHours component renders correctly without props', () => {
    const component = shallow(<StoreHours />);
    expect(component).toMatchSnapshot();
  });
});
