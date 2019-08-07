const getBagPageLabels = state => {
  const {
    bag: {
      addedToBag: { lbl_header_addedToBag: addedToBag, lbl_cta_checkout: checkout },
      bagOverview: { lbl_header_bag: bagHeading },
    },
  } = state.Labels;
  return {
    addedToBag,
    checkout,
    bagHeading,
  };
};
export default {
  getBagPageLabels,
};
