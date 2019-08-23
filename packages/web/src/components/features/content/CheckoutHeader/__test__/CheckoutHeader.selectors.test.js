import CheckoutHeaderSelector from '../container/CheckoutHeader.selectors';

describe('#Checkout Header Selectors', () => {
  const CheckoutHeaderState = {
    checkout: {
      checkoutHeader: {
        lbl_checkoutheader_checkout: 'Checkout',
        lbl_checkoutheader_returnBag: 'Return to Bag',
      },
    },
  };

  const state = {
    Labels: CheckoutHeaderState,
  };

  it('#checkout header should return labels', () => {
    expect(CheckoutHeaderSelector.getCheckoutHeaderLabels(state)).toEqual({
      checkoutHeaderLabel: 'Checkout',
      returnBagLabel: 'Return to Bag',
    });
  });
});
