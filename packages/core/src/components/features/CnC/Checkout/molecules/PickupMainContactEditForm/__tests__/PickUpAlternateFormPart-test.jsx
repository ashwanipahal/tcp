import React from 'react';
import { shallow } from 'enzyme';
import { PickupMainContactEditFormVanilla } from '../views/PickupMainContactEditForm.view';

describe('Coupon component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      labels: {},
      className: '',
      isCondensed: false,
      showNoteOnToggle: false,
      isAlternateUpdateChecked: false,
    };
    const component = shallow(<PickupMainContactEditFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
