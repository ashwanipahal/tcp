import React from 'react';
import { shallow } from 'enzyme';
import LeftNavigation from '../views/LeftNavigation';

describe('LeftNavigation component', () => {
  it('LeftNavigation component renders correctly without props', () => {
    const component = shallow(<LeftNavigation />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<LeftNavigation {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
