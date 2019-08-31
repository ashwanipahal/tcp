import React from 'react';
import { shallow } from 'enzyme';
import { PickupMainContactEditFormVanilla } from '../views/PickupMainContactEditForm.view';

describe('Coupon component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      dispatch: jest.fn(),
      labels: {},
      handleSubmit: jest.fn(),
      isMobile: true,
      isEditing: false,
      className: '',
      showPhoneNumber: false,
      formData: {},
      onEditModeChange: jest.fn(),
      handleExitEditModeClick: jest.fn(),
    };
    const component = shallow(<PickupMainContactEditFormVanilla {...props} />);
    component.instance().renderSectionTitle();
    expect(component).toMatchSnapshot();
  });
});
