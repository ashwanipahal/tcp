import constants from './ProductTabList.constants';

const initialState = {
  payload: {},
};

const ProductTabListReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case constants.PRODUCT_TAB_LIST_SUCCESS:
    case constants.PRODUCT_TAB_LIST_FAIL:
      return {
        ...state,
        ...Object.assign(state.payload, payload),
        errors: { ...state.errors, ...payload.errors },
      };
    default:
      return state;
  }
};

export default ProductTabListReducer;
