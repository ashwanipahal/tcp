import { getLabelValue } from '@tcp/core/src/utils/utils';

const getCheckoutHeaderLabels = state => {
  return {
    checkoutHeaderLabel: getLabelValue(
      state.Labels,
      'lbl_checkoutheader_checkout',
      'checkoutHeader',
      'checkout'
    ),
    returnBagLabel: getLabelValue(
      state.Labels,
      'lbl_checkoutheader_returnBag',
      'checkoutHeader',
      'checkout'
    ),
    expressCheckoutLbl: getLabelValue(
      state.Labels,
      'lbl_checkoutHeader_expressCheckout',
      'checkoutHeader',
      'checkout'
    ),
    carotIconLbl: getLabelValue(state.Labels, 'lbl_caret_icon', 'accessibility', 'global'),
  };
};

export default {
  getCheckoutHeaderLabels,
};
