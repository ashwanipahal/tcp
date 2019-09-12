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

// TODO - This is temporary - fix it by introducing the image carousel and zoom
export const getDefaultImage = state => {
  const images =
    state.ProductDetail.getIn(['currentProduct']) &&
    state.ProductDetail.getIn(['currentProduct', 'imagesByColor']).toJS();
  const keysForImage = (images && Object.keys(images)) || [];
  return (
    keysForImage.length &&
    state.ProductDetail.getIn(['currentProduct', 'imagesByColor', keysForImage[0], 'basicImageUrl'])
  );
};
