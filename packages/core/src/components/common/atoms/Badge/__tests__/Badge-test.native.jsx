import React from 'react';
import { shallow } from 'enzyme';
import { BadgeVanilla } from '../views/Badge.native';

describe('Native Badge component', () => {
  it('renders correctly with showCheckmark as false', () => {
    const props = {
      showCheckmark: false,
    };
    const component = shallow(<BadgeVanilla {...props}>Shipping</BadgeVanilla>);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with showCheckmark as true', () => {
    const props = {
      showCheckmark: true,
    };
    const component = shallow(<BadgeVanilla {...props}>Shipping</BadgeVanilla>);
    expect(component).toMatchSnapshot();
  });
});
