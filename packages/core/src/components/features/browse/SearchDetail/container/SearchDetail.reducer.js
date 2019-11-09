import SLP_CONSTANTS from './SearchDetail.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

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

const SearchDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SLP_CONSTANTS.SET_PRODUCTS:
      return {
        ...state,
        loadedProductsPages: [...state.loadedProductsPages, action.payload.loadedProductsPages[0]],
      };
    case SLP_CONSTANTS.SET_SLP_FIRST_PRODUCTS_PAGE:
      return { ...state, ...action.productsPage, [DEFAULT_REDUCER_KEY]: setCacheTTL() };
    case SLP_CONSTANTS.SET_SLP_LOADING_STATE:
      return { ...state, ...action.payload };
    case SLP_CONSTANTS.SET_SLP_SEARCHTERM_STATE:
      return { ...state, ...action.payload };
    case SLP_CONSTANTS.SET_SLP_RESULTS_AVAILABLE_STATE:
      return { ...state, ...action.payload };
    case SLP_CONSTANTS.RESET_PRODUCTS:
      return { ...state };
    default:
      return getDefaultState(state);
  }
};

export default SearchDetailReducer;
