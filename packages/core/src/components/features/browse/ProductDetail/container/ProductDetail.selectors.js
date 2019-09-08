export const getNavTree = state => {
  return state.Navigation.navigationData;
};

export const prodDetails = state => {
  return state.ProductDetail;
};

export const getBreadCrumbs = state => {
  return state.ProductDetail.get('breadCrumbs');
};
