import React from 'react';
import { shallow } from 'enzyme';
import { PickUpContactDisplayVanilla } from '../views/PickUpContactDisplay';

describe('PickUpContactDisplayVanilla component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      labels: {},
      className: '',
      isCondensed: false,
      showNoteOnToggle: false,
      isAlternateUpdateChecked: false,
    };
    const component = shallow(<PickUpContactDisplayVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
