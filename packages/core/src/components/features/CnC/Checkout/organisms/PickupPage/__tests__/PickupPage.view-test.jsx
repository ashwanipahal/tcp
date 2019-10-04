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
      isUsSite: false,
      pickUpLabels: {},
      smsSignUpLabels: {},
      currentPhoneNumber: '',
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      initialValues: {
        pickUpContact: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          emailAddress: '',
        },
      },
      isSmsUpdatesEnabled: true,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      orderHasShipping: true,
      isVenmoPaymentInProgress: false,
    };
    const component = shallow(<PickUpFormPartVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly props  present ', () => {
    const mockedOnPickupSubmit = jest.fn();
    const props = {
      className: '',
      isGuest: false,
      isMobile: false,
      pickupError: 'Error',
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
      orderHasShipping: false,
      onPickupSubmit: mockedOnPickupSubmit,
    };
    const component = shallow(<PickUpFormPartVanilla {...props} />);
    const data = {
      pickUpContact: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
      },
      pickUpAlternate: {
        hasAlternatePickup: true,
      },
      smsSignUp: {
        sendOrderUpdate: '',
      },
    };
    component.instance().handleEditModeChange({
      pickUpContact: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
      },
      isEditing: true,
    });
    component.setState({
      isEditing: true,
      pickUpContact: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
      },
    });
    component.instance().pickupSubmit(data);
    expect(mockedOnPickupSubmit).toBeCalled();
    component.instance().SaveAndCancelButton();
    expect(component).toMatchSnapshot();
  });

  it('calling getNextCTAText method', () => {
    const props = {
      className: '',
      isGuest: false,
      isMobile: false,
      pickupError: 'Error',
      isUsSite: false,
      pickUpLabels: { nextText: 'NEXT', reviewText: 'REVIEW' },
      smsSignUpLabels: {},
      currentPhoneNumber: '',
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      initialValues: {},
      isSmsUpdatesEnabled: true,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      orderHasShipping: false,
      isVenmoPaymentInProgress: true,
      isVenmoPickupDisplayed: false,
    };
    const tree = shallow(<PickUpFormPartVanilla {...props} />);
    const componentInstance = tree.instance();
    expect(componentInstance.getNextCTAText()).toEqual('NEXT: REVIEW');
  });

  it('calling getNextCTAText method with orderHasShipping', () => {
    const props = {
      className: '',
      isGuest: false,
      isMobile: false,
      pickupError: 'Error',
      isUsSite: false,
      pickUpLabels: { nextText: 'NEXT', reviewText: 'REVIEW', shippingText: 'SHIPPING' },
      smsSignUpLabels: {},
      currentPhoneNumber: '',
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      initialValues: {},
      isSmsUpdatesEnabled: true,
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      orderHasShipping: true,
      isVenmoPaymentInProgress: false,
    };
    const tree = shallow(<PickUpFormPartVanilla {...props} />);
    const componentInstance = tree.instance();
    expect(componentInstance.getNextCTAText()).toEqual('NEXT: SHIPPING');
  });
});
