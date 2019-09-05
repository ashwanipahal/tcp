import constants from './ProductTabList.constants';

const initialState = {};

const ProductTabListReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case constants.PRODUCT_TAB_LIST_REQ:
      return { ...state, loading: true };
    case constants.PRODUCT_TAB_LIST_SUCCESS:
    case constants.PRODUCT_TAB_LIST_FAIL:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};

export default ProductTabListReducer;
