import constants from './ProductTabList.constants';

const initialState = {};

const ProductTabListReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case constants.PRODUCT_TAB_LIST_REQ: {
      const { categoryId } = payload;
      return { ...state, status: { ...state.status, [categoryId]: true } };
    }
    case constants.PRODUCT_TAB_LIST_SUCCESS:
    case constants.PRODUCT_TAB_LIST_FAIL:
      return {
        ...state,
        ...payload,
        errors: { ...state.errors, ...payload.errors },
        status: { ...state.status, ...payload.status },
      };
    default:
      return state;
  }
};

export default ProductTabListReducer;
