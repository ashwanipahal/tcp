import React from 'react';
import { shallow } from 'enzyme';
import { PickUpFormPartVanilla } from '../views/PickUpFormPart.view';

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
    expect(component).toMatchSnapshot();
  });
});
