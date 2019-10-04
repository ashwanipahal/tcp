import React from 'react';
import { shallow } from 'enzyme';
import StoresInternational from '../views/StoresInternational';

describe('StoresInternational component', () => {
  it('StoresInternational component renders correctly without props', () => {
    const component = shallow(<StoresInternational />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<StoresInternational {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
