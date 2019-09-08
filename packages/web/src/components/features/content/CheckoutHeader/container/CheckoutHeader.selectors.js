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
      'checkout',
      'checkoutHeader'
    ),
    returnBagLabel: getLabelValue(
      state.Labels,
      'lbl_checkoutheader_returnBag',
      'checkout',
      'checkoutHeader'
    ),
  };
};

export default {
  getCheckoutHeaderLabels,
};
