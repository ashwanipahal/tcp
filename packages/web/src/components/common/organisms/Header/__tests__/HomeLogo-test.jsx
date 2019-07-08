import React from 'react';
import { shallow } from 'enzyme';
import { HomeLogoVanilla } from '../views/HomeLogo';

describe('HomeLogo component', () => {
  it('HomeLogo component renders correctly without props', () => {
    const component = shallow(<HomeLogoVanilla />);
    expect(component).toMatchSnapshot();
  });

  it('HomeLogo component renders correctly with props', () => {
    const props = {
      className: 'homelogo-class',
      alt: 'homelogo image',
      dataLocator: 'global_homelogo',
      imgSrc: 'src/homeImage',
    };
    const component = shallow(<HomeLogoVanilla {...props} />);
    expect(component.find('.homelogo-class')).toHaveLength(1);
  });
});
