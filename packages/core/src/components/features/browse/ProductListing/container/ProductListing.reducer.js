import PRODUCTLISTINGPAGE_CONSTANTS from './ProductListing.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = {
  [DEFAULT_REDUCER_KEY]: null,
};

const ProductListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTLISTINGPAGE_CONSTANTS.SET_PRODUCTS:
      return Object.assign({}, state, {
        [DEFAULT_REDUCER_KEY]: setCacheTTL(),
        ...action.payload,
      });
    default:
      return state;
  }
};

export default ProductListingReducer;
