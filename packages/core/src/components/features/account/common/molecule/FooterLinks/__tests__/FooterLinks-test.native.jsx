import React from 'react';
import { shallow } from 'enzyme';
import FooterLinks from '../views/FooterLinks.native';

describe('FooterLinks component', () => {
  it('FooterLinks component renders correctly without props', () => {
    const component = shallow(<FooterLinks />);
    expect(component).toMatchSnapshot();
  });
});
