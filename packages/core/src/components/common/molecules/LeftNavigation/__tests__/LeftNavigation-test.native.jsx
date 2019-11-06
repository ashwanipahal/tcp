import React from 'react';
import { shallow } from 'enzyme';
import LeftNavigation from '../views/LeftNavigation.native';

describe('LeftNavigation component', () => {
  it('LeftNavigation component renders correctly without props', () => {
    const component = shallow(<LeftNavigation />);
    expect(component).toMatchSnapshot();
  });
});
