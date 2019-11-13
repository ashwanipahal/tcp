import BUNDLEPRODUCT_CONSTANTS from './BundleProduct.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const BundleProductReducer = (state = initialState, action) => {
  const { payload = {}, type } = action;
  switch (type) {
    case BUNDLEPRODUCT_CONSTANTS.SET_BUNDLE_DETAILS:
      return { ...state, currentProduct: { ...payload.product }, ...payload.breadCrumbs };
    case BUNDLEPRODUCT_CONSTANTS.SET_BUNDLE_PRODUCTS_DETAILS:
      return { ...state, currentBundle: action.payload };
    default:
      return { ...state };
  }
};

export default BundleProductReducer;
