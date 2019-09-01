import React from 'react';
import { shallow } from 'enzyme';
import { PickUpFormPartVanilla } from '../views/PickupPage.view';

describe('PickUpFormPartVanilla component', () => {
  it('should renders correctly props not present', () => {
    const props = {
      className: '',
      isGuest: true,
      isMobile: false,
      pickupError: '',
      isUsSite: true,
      pickUpLabels: {},
      smsSignUpLabels: {},
      currentPhoneNumber: '',
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      initialValues: {},
      isSmsUpdatesEnabled: true,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      orderHasShipping: jest.fn(),
    };
    const component = shallow(<PickUpFormPartVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly props  present ', () => {
    const props = {
      className: '',
      isGuest: true,
      isMobile: true,
      pickupError: '',
      isUsSite: false,
      pickUpLabels: {},
      smsSignUpLabels: {},
      currentPhoneNumber: '',
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      initialValues: {},
      isSmsUpdatesEnabled: true,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      orderHasShipping: jest.fn(),
    };
    const component = shallow(<PickUpFormPartVanilla {...props} />);
    component.setState({
      isEditing: true,
      pickUpContact: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
      },
    });
    component.instance().SaveAndCancelButton();
    expect(component).toMatchSnapshot();
  });
});
