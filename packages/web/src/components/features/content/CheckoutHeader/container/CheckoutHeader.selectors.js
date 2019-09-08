import { getLabelValue } from '@tcp/core/src/utils/utils';

const getCheckoutHeaderLabels = state => {
  // const {
  //   checkout: {
  //     checkoutHeader: {
  //       lbl_checkoutheader_checkout: checkoutHeaderLabel,
  //       lbl_checkoutheader_returnBag: returnBagLabel,
  //     },
  //   },
  // } = state.Labels;
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
  };
};

export default {
  getCheckoutHeaderLabels,
};
