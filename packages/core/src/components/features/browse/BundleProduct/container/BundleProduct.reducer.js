import { fromJS } from 'immutable';
import BUNDLEPRODUCT_CONSTANTS from './BundleProduct.constants';
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

const BundleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUNDLEPRODUCT_CONSTANTS.SET_BUNDLE_DETAILS:
      return state
        .set('currentProduct', action.payload.product)
        .set('breadCrumbs', action.payload.breadCrumbs);
    case BUNDLEPRODUCT_CONSTANTS.SET_BUNDLE_PRODUCTS_DETAILS:
      return state.set('currentBundle', action.payload);
    default:
      return getDefaultState(state);
  }
};

export default BundleProductReducer;
