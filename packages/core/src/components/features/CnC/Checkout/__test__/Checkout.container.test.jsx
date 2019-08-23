import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutContainer, mapDispatchToProps } from '../container/Checkout.container';
import CheckoutPage from '../views/CheckoutPage.view';

describe('CheckoutPage Container', () => {
  const router = {
    query: {
      section: ''
    },
  };

  const props = {
    router,
    initialValues:{},
    onEditModeChange: true,
    isSmsUpdatesEnabled: true,
    currentPhoneNumber: "",
    isGuest: true,
    isMobile: false,
    isExpressCheckout: false,
    activeStage: "shipping",
    activeStep: "shipping",
    isUsSite: false,
    initCheckout: jest.fn(),
  };
  it('should render CheckoutPage view section', () => {
    const tree = shallow(<CheckoutContainer {...props} />);
    expect(tree.is(CheckoutPage)).toBeTruthy();
  });

  it('should render CheckoutPage view section', () => {
    const component = shallow(<CheckoutContainer {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action initcheckout which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.initCheckout();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
