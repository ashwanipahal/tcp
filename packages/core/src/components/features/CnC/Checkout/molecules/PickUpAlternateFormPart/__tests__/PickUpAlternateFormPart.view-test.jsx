import React from 'react';
import { shallow } from 'enzyme';
import { PickUpAlternateFormPartVanilla } from '../views/PickUpAlternateFormPart.view';

describe('Coupon component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      labels: {},
      className: '',
      isCondensed: false,
      showNoteOnToggle: false,
      isAlternateUpdateChecked: false,
    };
    const component = shallow(<PickUpAlternateFormPartVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when data is present', () => {
    const props = {
      labels: {},
      className: '',
      isCondensed: false,
      showNoteOnToggle: true,
      isAlternateUpdateChecked: true,
    };
    const component = shallow(<PickUpAlternateFormPartVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
