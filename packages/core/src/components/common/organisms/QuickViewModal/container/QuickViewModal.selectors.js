export const getProductInfo = state => {
  return state.QuickView.get('quickViewProduct');
};

export const getModalState = state => {
  return state.QuickView.get('isModalOpen');
};

export const getQuickViewLabels = state => {
  if (!state.Labels || !state.Labels.Browse)
    return {
      addToBag: '',
      viewProductDetails: '',
    };

  const {
    Browse: {
      QuickView: { lbl_add_to_bag: addToBag, lbl_view_product_details: viewProductDetails },
    },
  } = state.Labels;
  return {
    addToBag,
    viewProductDetails,
  };
};
