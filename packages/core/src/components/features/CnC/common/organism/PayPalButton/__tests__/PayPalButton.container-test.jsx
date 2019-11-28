import React from 'react';
import { shallow } from 'enzyme';
import { PayPalButtonContainer, mapDispatchToProps } from '../container/PayPalButton.container';
import PayPalButton from '../organism/PaypalButton';
import { isMobileApp } from '../../../../../../../utils';
import CHECKOUT_SELECTORS from '../../../../Checkout/container/Checkout.selector';

jest.mock('../../../../../../../utils', () => ({
  getViewportInfo: jest.fn(),
  isCanada: jest.fn(),
  isMobileApp: jest.fn(),
  isClient: jest.fn(),
  getIconPath: jest.fn(),
  getAPIConfig: () => ({
    paypalEnv: 'sandBox',
  }),
}));

describe('#PayPal Button Container', () => {
  const isQualifedOrder = false;
  const initalizePayPalButton = {};
  const emptyObject = {};
  const getPayPalSettings = {
    paypalInContextToken: 'Ak-1',
  };

  it('should render Order Ledger view section', () => {
    const mocked = jest.fn();
    const tree = shallow(
      <PayPalButtonContainer
        isQualifedOrder={isQualifedOrder}
        initalizePayPalButton={initalizePayPalButton}
        containerId="divId"
        navigation={emptyObject}
        getPayPalSettings={getPayPalSettings}
        payPalWebViewHandle={mocked}
        paypalAuthorizationHandle={mocked}
        clearPaypalSettings={mocked}
        paypalEnv="sandbox"
      />
    );
    expect(tree.is(PayPalButton)).toBeTruthy();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action startPaypalCheckout ', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.startPaypalCheckout();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action paypalAuthorizationHandle ', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.paypalAuthorizationHandle();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action clearPaypalSettings ', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.clearPaypalSettings();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('if isMobileApp true', () => {
      isMobileApp.mockImplementation(() => true);
      expect(CHECKOUT_SELECTORS.getIsMobile()).toEqual(true);
    });
  });
});
