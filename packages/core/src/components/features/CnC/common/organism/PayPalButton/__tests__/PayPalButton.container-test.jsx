import React from 'react';
import { shallow } from 'enzyme';
import { PayPalButtonContainer } from '../container/PayPalButton.container';
import PayPalButton from '../organism/PaypalButton';

describe('Order Ledger Container', () => {
  const isQualifedOrder = false;
  const initalizePayPalButton = {};

  it('should render Order Ledger view section', () => {
    const tree = shallow(
      <PayPalButtonContainer
        isQualifedOrder={isQualifedOrder}
        initalizePayPalButton={initalizePayPalButton}
      />
    );
    expect(tree.is(PayPalButton)).toBeTruthy();
  });
});
