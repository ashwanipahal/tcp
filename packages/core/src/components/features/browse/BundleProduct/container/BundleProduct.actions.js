import BUNDLEPRODUCT_CONSTANTS from './BundleProduct.constants';

export const setProductDetails = payload => {
  return {
    type: BUNDLEPRODUCT_CONSTANTS.SET_BUNDLE_DETAILS,
    payload,
  };
};

export const getProductDetails = payload => {
  return {
    type: BUNDLEPRODUCT_CONSTANTS.FETCH_BUNDLE_DETAILS,
    payload,
  };
};

export const setBundleDetails = payload => {
  return {
    type: BUNDLEPRODUCT_CONSTANTS.SET_BUNDLE_PRODUCTS_DETAILS,
    payload,
  };
};
