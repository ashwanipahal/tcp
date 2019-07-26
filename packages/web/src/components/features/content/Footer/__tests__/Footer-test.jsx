import React from 'react';
import { shallow } from 'enzyme';
import { FooterVanilla } from '../views/Footer.view';

describe('Footer component', () => {
  it('Footer component renders correctly without props', () => {
    const component = shallow(<FooterVanilla />);
    expect(component).toMatchSnapshot();
  });

  it('Footer component renders correctly with props', () => {
    const props = {
      className: 'footer-class',
    };
    const component = shallow(<FooterVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.footer-class')).toHaveLength(4);
  });
});
