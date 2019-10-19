import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutContainer, mapDispatchToProps } from '../container/CheckoutCommonContainer';
import CheckoutPage from '../views/CheckoutPage.view';

describe('CheckoutPage Container', () => {
  const router = {
    query: {
      section: '',
    },
  };
  const props = {
    router,
    initialValues: {},
    onEditModeChange: true,
    isSmsUpdatesEnabled: true,
    currentPhoneNumber: '',
    isGuest: true,
    isMobile: false,
    isExpressCheckout: false,
    activeStage: 'shipping',
    activeStep: 'shipping',
    isUsSite: false,
    initCheckout: jest.fn(),
    fetchNeedHelpContent: jest.fn(),
    isRegisteredUserCallDone: true,
    getUserInformation: jest.fn(),
  };

  it('should render CheckoutPage view section', () => {
    const tree = shallow(<CheckoutContainer {...props} />);
    expect(tree.is(CheckoutPage)).toBeTruthy();
  });

  it('should render CheckoutPage view section', () => {
    const component = shallow(<CheckoutContainer {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call componentDidUpdate', () => {
    props.isRegisteredUserCallDone = false;
    const component = shallow(<CheckoutContainer {...props} />);
    component.setProps({ isRegisteredUserCallDone: true });
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action initcheckout which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.initCheckout();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action submitShipping which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.submitShipping();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action onPickupSubmit which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onPickupSubmit();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action onEditModeChange which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onEditModeChange();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action loadShipmentMethods which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.loadShipmentMethods();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action routeToPickupPage which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.routeToPickupPage();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action setCheckoutStage which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.setCheckoutStage();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action updateShippingMethodSelection which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.updateShippingMethodSelection();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action updateShippingAddressData which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.updateShippingAddressData();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action addNewShippingAddressData which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.addNewShippingAddressData();
    });

    it('should return an action submitBilling which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.submitBilling();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action fetchNeedHelpContent which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.fetchNeedHelpContent();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
