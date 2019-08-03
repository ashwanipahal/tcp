const getBagPageLabels = state => {
  const {
    bag: {
      addedToBag: { lbl_header_addedToBag: addedToBag },
    },
  } = state.Labels;
  return {
    addedToBag,
  };
};

export default {
  getBagPageLabels,
};
