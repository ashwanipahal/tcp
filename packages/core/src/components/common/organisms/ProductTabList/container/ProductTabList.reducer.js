import constants from './ProductTabList.constants';

const initialState = {};

const ProductTabListReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case constants.PRODUCT_TAB_LIST_REQ: {
      const { categoryId } = payload;
      return { ...state, completed: { ...state.completed, [categoryId]: true } };
    }
    case constants.PRODUCT_TAB_LIST_SUCCESS:
    case constants.PRODUCT_TAB_LIST_FAIL:
      return {
        ...state,
        ...payload,
        errors: { ...state.errors, ...payload.errors },
        completed: { ...state.completed, ...payload.completed },
      };
    default:
      return state;
  }
};

export default ProductTabListReducer;
