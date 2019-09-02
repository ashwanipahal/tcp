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
      console.log('comes in set products details reducer');
      return state.set('details', action.payload);
    default:
      return getDefaultState(state);
  }
};

export default ProductDetailReducer;
