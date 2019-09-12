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
