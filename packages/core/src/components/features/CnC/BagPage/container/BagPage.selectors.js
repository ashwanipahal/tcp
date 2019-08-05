const getBagPageLabels = state => {
  const {
    bag: {
      addedToBag: { lbl_header_addedToBag: addedToBag, lbl_cta_checkout: checkout },
    },
  } = state.Labels;
  return {
    addedToBag,
    checkout,
  };
};

export default {
  getBagPageLabels,
};
