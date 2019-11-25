import PRODUCTDETAIL_CONSTANTS from './ProductDetail.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const ProductDetailReducer = (state = initialState, action) => {
  const { payload = {}, type } = action;
  switch (type) {
    case PRODUCTDETAIL_CONSTANTS.SET_PRODUCT_DETAILS:
      return { ...state, currentProduct: { ...payload.product }, breadCrumbs: payload.breadCrumbs };
    case PRODUCTDETAIL_CONSTANTS.SET_ADD_TO_FAVORITE:
      // eslint-disable-next-line no-case-declarations
      const productDetailsMap = state.currentProduct;
      // eslint-disable-next-line consistent-return
      productDetailsMap.colorFitsSizesMap = productDetailsMap.colorFitsSizesMap.map(item => {
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
      return { ...state, currentProduct: { ...productDetailsMap } };
    default:
      return { ...state };
  }
};

export default ProductDetailReducer;
