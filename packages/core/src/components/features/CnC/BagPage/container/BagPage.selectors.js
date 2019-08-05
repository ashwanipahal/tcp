const getBagPageLabels = state => {
  const {
    bag: {
      bagOverview: { lbl_header_bag: bagHeading },
    },
  } = state.Labels;
  return {
    bagHeading,
  };
};

export default {
  getBagPageLabels,
};
