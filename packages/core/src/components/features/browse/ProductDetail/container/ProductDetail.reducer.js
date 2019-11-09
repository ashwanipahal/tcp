import PRODUCTDETAIL_CONSTANTS from './ProductDetail.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  // if (state instanceof Object) {
  //   return fromJS(state);
  // }
  return state;
};

const ProductDetailReducer = (state = initialState, action) => {
  const { payload: { product, breadCrumbs } = {}, type } = action;
  switch (type) {
    case PRODUCTDETAIL_CONSTANTS.SET_PRODUCT_DETAILS:
      return { ...state, currentProduct: { ...product }, breadCrumbs: { ...breadCrumbs } };
    case PRODUCTDETAIL_CONSTANTS.SET_ADD_TO_FAVORITE:
      // eslint-disable-next-line no-case-declarations
      const productDetailsMap = state.currentProduct;
      // eslint-disable-next-line consistent-return
      productDetailsMap.colorFitsSizesMap = productDetailsMap.colorFitsSizesMap.map(item => {
        if (item.colorProductId === action.payload.colorProductId) {
          // eslint-disable-next-line no-param-reassign
          item = {
            ...item,
            isFavorite: true,
            favoritedCount: action.payload.res && action.payload.res.favoritedCount,
          };
        }
        return item;
      });
      return { ...state, currentProduct: { ...productDetailsMap } };
    default:
      return getDefaultState(state);
  }
};

export default ProductDetailReducer;
