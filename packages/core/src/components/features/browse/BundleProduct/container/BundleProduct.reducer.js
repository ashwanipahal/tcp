import BUNDLEPRODUCT_CONSTANTS from './BundleProduct.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const BundleProductReducer = (state = initialState, action) => {
  const { payload = {}, type } = action;
  switch (type) {
    case BUNDLEPRODUCT_CONSTANTS.SET_BUNDLE_DETAILS:
      return { ...state, currentProduct: { ...payload.product }, breadCrumbs: payload.breadCrumbs };
    case BUNDLEPRODUCT_CONSTANTS.SET_BUNDLE_PRODUCTS_DETAILS:
      return { ...state, currentBundle: action.payload };
    case BUNDLEPRODUCT_CONSTANTS.CLEAR_BUNDLE_DETAILS:
      return { ...state, currentProduct: null, currentBundle: null };
    case BUNDLEPRODUCT_CONSTANTS.SET_ADD_TO_FAVORITE:
      // eslint-disable-next-line no-case-declarations
      let bundleMap = state.currentBundle;
      // eslint-disable-next-line consistent-return
      bundleMap = bundleMap.map(bundles => {
        // eslint-disable-next-line no-param-reassign
        bundles.products.colorFitsSizesMap = bundles.products.colorFitsSizesMap.map(item => {
          if (item.colorProductId === action.payload.pdpColorProductId) {
            // eslint-disable-next-line no-param-reassign
            item = {
              ...item,
              isFavorite: true,
              favoritedCount: action.payload.res && action.payload.res.favoritedCount,
            };
          }
          return item;
        });
        return bundles;
      });

      return { ...state, currentBundle: bundleMap };
    default:
      return { ...state };
  }
};

export default BundleProductReducer;
