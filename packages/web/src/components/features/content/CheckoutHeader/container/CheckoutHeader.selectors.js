const getCheckoutHeaderLabels = state => {
  const {
    checkout: {
      checkoutHeader: {
        lbl_checkoutheader_checkout: checkoutHeaderLabel,
        lbl_checkoutheader_returnBag: returnBagLabel,
      },
    },
  } = state.Labels;
  return {
    checkoutHeaderLabel,
    returnBagLabel,
  };
};

export default {
  getCheckoutHeaderLabels,
};
