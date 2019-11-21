import React from 'react';
import { shallow } from 'enzyme';
import { PickUpFormPartVanilla } from '../views/PickupPage.view.native';
import Anchor from '../../../../../../common/atoms/Anchor';

describe('PickUpFormPart component', () => {
  it('should renders correctly props not present', () => {
    const props = {
      initialValues: {},
      pickUpLabels: {},
      smsSignUpLabels: {},
      cartOrderItemsCount: 1,
      checkoutPageEmptyBagLabels: {},
      className: '',
      isSmsUpdatesEnabled: false,
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
      pickupDidMount: jest.fn(),
    };
    const component = shallow(<PickUpFormPartVanilla {...props} />);
    component.instance().SaveAndCancelButton();
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly props  present ', () => {
    const props = {
      initialValues: {},
      cartOrderItemsCount: 1,
      checkoutPageEmptyBagLabels: {},
      pickUpLabels: {},
      smsSignUpLabels: {},
      className: '',
      isSmsUpdatesEnabled: true,
      isGuest: true,
      isMobile: false,
      isSMSActive: false,
      isUsSite: false,
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      pickupError: 'Error handle',
      currentPhoneNumber: '',
      handleSubmit: jest.fn(),
      dispatch: jest.fn(),
      pickupDidMount: jest.fn(),
    };
    const component = shallow(<PickUpFormPartVanilla {...props} />);
    component.setState({ isEditing: true });
    component.instance().SaveAndCancelButton();
    expect(component).toMatchSnapshot();
  });

  it(' should renders correctly props with state update ', () => {
    const props = {
      initialValues: {},
      cartOrderItemsCount: 1,
      checkoutPageEmptyBagLabels: {},
      pickUpLabels: {},
      smsSignUpLabels: {},
      className: '',
      isSmsUpdatesEnabled: true,
      isGuest: true,
      isMobile: true,
      isSMSActive: false,
      isUsSite: false,
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      pickupError: 'Error handle',
      currentPhoneNumber: '',
      handleSubmit: jest.fn(),
      dispatch: jest.fn(),
      pickupDidMount: jest.fn(),
    };
    const component = shallow(<PickUpFormPartVanilla {...props} />);
    component.find(Anchor).simulate('press', { preventDefault: jest.fn() });
    expect(component).toMatchSnapshot();
  });
});
