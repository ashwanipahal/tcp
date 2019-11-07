/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
import { fromJS } from 'immutable';
import PRODUCTDETAIL_CONSTANTS from './ProductDetail.constants';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
});

const getDefaultState = state => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
};

const ProductDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTDETAIL_CONSTANTS.SET_PRODUCT_DETAILS:
      return state
        .set('currentProduct', action.payload.product)
        .set('breadCrumbs', action.payload.breadCrumbs);
    case PRODUCTDETAIL_CONSTANTS.SET_ADD_TO_FAVORITE:
      // eslint-disable-next-line no-case-declarations
      let productDetailsMap = state.get('currentProduct');
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
      return state.set('currentProduct', { ...productDetailsMap });
    default:
      return getDefaultState(state);
  }
};

export default ProductDetailReducer;
