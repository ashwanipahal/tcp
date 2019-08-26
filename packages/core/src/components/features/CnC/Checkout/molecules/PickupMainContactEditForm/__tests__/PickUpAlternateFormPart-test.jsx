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
      isMobile: true,
      formData: {},
      isEditing: false,
      isReset: false,
      onClose: jest.fn(),
    };
    const component = shallow(<PickupMainContactEditFormVanilla {...props} />);
    component.instance().renderSectionTitle();
    component.instance().SaveButton();
    expect(component).toMatchSnapshot();
  });
});
