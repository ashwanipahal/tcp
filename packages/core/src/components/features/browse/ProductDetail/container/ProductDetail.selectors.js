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
