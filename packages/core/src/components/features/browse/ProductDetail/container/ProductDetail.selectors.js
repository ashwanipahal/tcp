export const getNavTree = state => {
  return state.Navigation.navigationData;
};

export const prodDetails = state => {
  return state.ProductDetail;
};

export const getBreadCrumbs = state => {
  return state.ProductDetail.get('breadCrumbs');
};

export const getDescription = state => {
  return state.ProductDetail.getIn(['currentProduct', 'longDescription']);
};

export const getRatingsProductId = state => {
  return state.ProductDetail.getIn(['currentProduct', 'ratingsProductId']);
};

export const getPlpLabels = state => {
  if (!state.Labels || !state.Labels.PLP)
    return {
      addToBag: '',
      errorMessage: '',
      size: '',
      fit: '',
      color: '',
      quantity: '',
    };

  const {
    PLP: {
      plpTiles: {
        lbl_add_to_bag: addToBag,
        lbl_pdp_size_error: errorMessage,
        lbl_pdp_size: size,
        lbl_pdp_fit: fit,
        lbl_pdp_color: color,
        lbl_pdp_quantity: quantity,
      },
    },
  } = state.Labels;

  return {
    addToBag,
    errorMessage,
    size,
    fit,
    color,
    quantity,
  };
};

// TODO - This is temporary - fix it by introducing the image carousel and zoom
export const getDefaultImage = state => {
  const firstColor = state.ProductDetail.getIn([
    'currentProduct',
    'colorFitsSizesMap',
    0,
    'color',
    'name',
  ]);
  return (
    firstColor &&
    state.ProductDetail.getIn(['currentProduct', 'imagesByColor', firstColor, 'basicImageUrl'])
  );
};

export const getCurrentCurrency = state => {
  return state.session.getIn(['siteDetails', 'currency']);
};

export const getCurrentProduct = state => {
  return state.ProductDetail.get('currentProduct');
};

export const getPDPLabels = state => {
  if (!state.Labels || !state.Labels.Browse)
    return {
      fullSize: '',
    };

  const {
    Browse: {
      PDP: { lbl_full_size: fullSize },
    },
  } = state.Labels;
  return {
    fullSize,
  };
};
