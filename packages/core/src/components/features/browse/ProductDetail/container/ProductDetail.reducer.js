import PRODUCTDETAIL_CONSTANTS from './ProductDetail.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const ProductDetailReducer = (state = initialState, action) => {
  const { payload = {}, type } = action;
  switch (type) {
    case PRODUCTDETAIL_CONSTANTS.SET_PRODUCT_DETAILS: {
      return { ...state, currentProduct: { ...payload.product }, breadCrumbs: payload.breadCrumbs };
    }
    case PRODUCTDETAIL_CONSTANTS.SET_PRODUCT_DETAILS_DYNAMIC_DATA:
      return { ...state, currentProductDynamicData: { ...payload.product } };
    case PRODUCTDETAIL_CONSTANTS.SET_PDP_LOADING_STATE:
      return { ...state, ...payload };
    case PRODUCTDETAIL_CONSTANTS.SET_ADD_TO_FAVORITE: {
      const productDetailsMap = state.currentProduct;
      const currentProductDynamicDataMap = state.currentProductDynamicData;
      const productMap = currentProductDynamicDataMap
        ? [productDetailsMap, currentProductDynamicDataMap]
        : [productDetailsMap];
      productMap.map(productInfo => {
        // eslint-disable-next-line no-param-reassign
        productInfo.colorFitsSizesMap = productInfo.colorFitsSizesMap.map(item => {
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
        return productInfo;
      });
      return { ...state, currentProduct: { ...productDetailsMap } };
    }
    default:
      return { ...state };
  }
};

export default ProductDetailReducer;
