import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutFooterVanilla } from '../views/CheckoutFooter.view';

describe('CheckoutFooterVanilla component', () => {
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
    showVenmoSubmit: true,
  };

  it('should renders correctly', () => {
    const component = shallow(<CheckoutFooterVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with footer', () => {
    const updatedProps = {
      ...props,
      footerBody: 'Footer',
    };
    const component = shallow(<CheckoutFooterVanilla {...updatedProps} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with venmo', () => {
    const updatedProps = {
      ...props,
      showVenmoSubmit: true,
    };
    const component = shallow(<CheckoutFooterVanilla {...updatedProps} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with venmo and error', () => {
    const updatedProps = {
      ...props,
      showVenmoSubmit: true,
      venmoError: 'Cannot process your request',
    };
    const component = shallow(<CheckoutFooterVanilla {...updatedProps} />);
    expect(component).toMatchSnapshot();
  });
});
