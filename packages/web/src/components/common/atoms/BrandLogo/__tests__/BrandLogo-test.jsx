import React from 'react';
import { shallow } from 'enzyme';
import { BrandLogoVanilla } from '../BrandLogo';

describe('BrandLogo component', () => {
  it('BrandLogo component renders correctly without props', () => {
    const component = shallow(<BrandLogoVanilla />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'homelogo-class',
      alt: 'homelogo image',
      dataLocator: 'global_homelogo',
      imgSrc: 'src/homeImage',
    };
    const component = shallow(<BrandLogoVanilla {...props} />);
    expect(component.find('.homelogo-class')).toHaveLength(1);
  });
});
