import React from 'react';
import { shallow } from 'enzyme';
import LegalLink from '../views/LegalLinks.native';

describe('LegalLinks component', () => {
  it('LegalLinks component renders correctly without props', () => {
    const component = shallow(<LegalLink />);
    expect(component).toMatchSnapshot();
  });
});
