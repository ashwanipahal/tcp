import React from 'react';
import { shallow } from 'enzyme';
import { formatPayload, mapDispatchToProps } from '../container/CheckoutCommonContainer.util';
import { CheckoutContainer } from '../container/CheckoutCommonContainer';
import { CheckoutPageVanilla } from '../views/CheckoutPage.view';

describe('Bag page Container', () => {
  const props = {
    labels: {},
    initCheckout: jest.fn(),
    clearCheckoutServerError: jest.fn(),
    fetchNeedHelpContent: jest.fn(),
    setVenmoPickupState: jest.fn(),
    setVenmoShippingState: jest.fn(),
    markBagPageRoutingDone: jest.fn(),
    getUserInformation: jest.fn(),
    isPickupModalOpen: jest.fn(),
    isRegisteredUserCallDone: true,
    initCheckoutSectionPage: jest.fn(),
    router: { query: {} },
    checkoutServerError: true,
  };
  it('should render Added to Bag view section', () => {
    const tree = shallow(<CheckoutContainer {...props} />);
    expect(tree.is(CheckoutPageVanilla)).toBeTruthy();
  });

  it('should render Added to Bag view section', () => {
    const component = shallow(<CheckoutContainer {...props} />);
    expect(component).toMatchSnapshot();
    const componentInstance = component.instance();
    componentInstance.componentDidMount();
    componentInstance.componentDidUpdate({ isRegisteredUserCallDone: 'false' });
    componentInstance.shippingDidMount();
    componentInstance.billingDidMount();
    componentInstance.reviewDidMount();
    componentInstance.pickupDidMount();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action closeModal which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.initCheckoutSectionPage();
      dispatchProps.submitReview();
      dispatchProps.initCheckout();
      dispatchProps.submitShipping();
      dispatchProps.onPickupSubmit();
      dispatchProps.loadShipmentMethods();
      dispatchProps.routeToPickupPage();
      dispatchProps.setCheckoutStage();
      dispatchProps.updateShippingMethodSelection();
      dispatchProps.updateShippingAddressData();
      dispatchProps.addNewShippingAddressData();
      dispatchProps.submitBilling();
      dispatchProps.fetchNeedHelpContent();
      dispatchProps.verifyAddressAction();
      dispatchProps.dispatchReviewReduxForm();
      dispatchProps.submitVerifiedShippingAddressData();
      dispatchProps.toastMessage();
      dispatchProps.setVenmoPickupState();
      dispatchProps.setVenmoShippingState();
      dispatchProps.clearCheckoutServerError();
      dispatchProps.toggleCountrySelector();
      expect(dispatch.mock.calls).toHaveLength(21);
    });
  });

  describe('#util methods', () => {
    it('formatPayload', () => {
      expect(
        formatPayload({
          addressLine1: 'test',
          addressLine2: 'test',
          zipCode: 123,
          a: 1,
        })
      ).toEqual({ a: 1, address1: 'test', address2: 'test', zip: 123 });
    });
  });
});
