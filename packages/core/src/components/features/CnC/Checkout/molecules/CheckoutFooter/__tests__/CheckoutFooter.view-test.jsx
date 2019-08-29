import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutFooterVanilla } from '../views/CheckoutFooter.view';

describe('CheckoutFooterVanilla component', () => {
  it('should renders correctly', () => {
    const props = {
      isGuest: false,
      isMobile: false,
      isUsSite: false,
      onEditModeChange: false,
      isSmsUpdatesEnabled: false,
      currentPhoneNumber: 3453453453,
      shippingProps: {},
      isOrderUpdateChecked: false,
      isAlternateUpdateChecked: false,
      pickupInitialValues: {},
      pickUpLabels: {},
      smsSignUpLabels: {},
      router: {},
      initialValues: {},
      orderHasPickUp: false,
      navigation: {},
      submitShippingSection: () => {},
    };
    const component = shallow(<CheckoutFooterVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
