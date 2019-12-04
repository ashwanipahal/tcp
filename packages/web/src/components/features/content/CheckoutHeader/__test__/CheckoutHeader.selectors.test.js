import CheckoutHeaderSelector from '../container/CheckoutHeader.selectors';

describe('#Checkout Header Selectors', () => {
  const CheckoutHeaderState = {
    checkout: {
      checkoutHeader: {
        lbl_checkoutheader_checkout: 'Checkout',
        lbl_checkoutheader_returnBag: 'Return to Bag',
        lbl_checkoutHeader_expressCheckout: 'Express Checkout',
        lbl_img_alt_carot_icon: 'Exit from checkout',
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
      expressCheckoutLbl: 'Express Checkout',
      carotIconLbl: 'Exit from checkout',
    });
  });
});
