import constants from './ProductListTabs.constants';

const initialState = {};

const ProductListTabsReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case constants.PRODUCT_LIST_TAB_REQ:
      return { ...state, loading: true };
    case constants.PRODUCT_LIST_TAB_SUCCESS:
      return { ...state, ...payload, loading: false };
    case constants.PRODUCT_LIST_TAB_FAIL:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};

export default ProductListTabsReducer;
