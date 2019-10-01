import constants from './StyliticsProductTabList.constants';

const initialState = {};

const StyliticsProductTabListReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case constants.STYLITICS_PRODUCT_TAB_LIST_SUCCESS:
    case constants.STYLITICS_PRODUCT_TAB_LIST_FAIL:
      return { ...state, ...payload, errors: { ...state.errors, ...payload.errors } };
    default:
      return state;
  }
};

export default StyliticsProductTabListReducer;
