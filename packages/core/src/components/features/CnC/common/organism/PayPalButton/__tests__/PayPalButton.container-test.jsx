import React from 'react';
import { shallow } from 'enzyme';
import { PayPalButtonContainer, mapDispatchToProps } from '../container/PayPalButton.container';
import PayPalButton from '../organism/PaypalButton';

describe('Order Ledger Container', () => {
  const isQualifedOrder = false;
  const initalizePayPalButton = {};

  it('should render Order Ledger view section', () => {
    const mocked = jest.fn();

    const tree = shallow(
      <PayPalButtonContainer
        isQualifedOrder={isQualifedOrder}
        initalizePayPalButton={initalizePayPalButton}
        startPaypalCheckout={mocked}
        paypalAuthorizationHandle={mocked}
        clearPaypalSettings={mocked}
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
  });
});
