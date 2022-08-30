import React from 'react';
import { shallow } from 'enzyme';
import { BadgeVanilla } from '../views/Badge';

describe('Badge component', () => {
  it('renders correctly with showCheckmark as false', () => {
    const props = {
      className: 'sample-badge',
    };
    const component = shallow(<BadgeVanilla {...props}>Shipping</BadgeVanilla>);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with showCheckmark as true', () => {
    const props = {
      className: 'sample-badge',
      showCheckmark: true,
    };
    const component = shallow(<BadgeVanilla {...props}>Shipping</BadgeVanilla>);
    expect(component).toMatchSnapshot();
  });
});
