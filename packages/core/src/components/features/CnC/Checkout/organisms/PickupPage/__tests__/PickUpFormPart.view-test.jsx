import React from 'react';
import { shallow } from 'enzyme';
import { PickUpFormPartVanilla } from '../views/PickupPage.view';

describe('PickUpFormPartVanilla component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      pickUpLabels: {},
      smsSignUpLabels: {},
      className: '',
      isGuest: false,
      isMobile: false,
      isSMSActive: false,
      isUsSite: false,
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      pickupError: '',
      currentPhoneNumber: '',
      handleSubmit: jest.fn(),
      dispatch: jest.fn(),
    };
    const component = shallow(<PickUpFormPartVanilla {...props} />);
    component.instance().handleEditModeChange();
    component.instance().onEditMainContactSubmit();
    component.instance().handleExitEditModeClick();
    component.instance().SaveAndCancelButton();

    expect(component).toMatchSnapshot();
  });
  it('should renders correctly when pickupError', () => {
    const props = {
      pickUpLabels: {},
      smsSignUpLabels: {},
      className: '',
      isGuest: true,
      isMobile: false,
      isSMSActive: false,
      isUsSite: false,
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      pickupError: 'adafd',
      currentPhoneNumber: '',
      handleSubmit: jest.fn(),
      dispatch: jest.fn(),
      isSmsUpdatesEnabled: true,
      isEditing: true,
    };
    const component = shallow(<PickUpFormPartVanilla {...props} />);

    expect(component).toMatchSnapshot();
  });
});
