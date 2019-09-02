// import { fromJS } from 'immutable';
import constants from './ProductListTabs.constants';

const initialState = {}; // fromJS(\null);

const ProductListTabsReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case constants.PRODUCT_LIST_TAB_REQ:
      return { loading: true };
    case constants.PRODUCT_LIST_TAB_SUCCESS:
      return { loading: false, ...payload };
    // return fromJS(payload);
    case constants.PRODUCT_LIST_TAB_FAIL:
      return { loading: false, ...payload };
    default:
      return state;
  }
};

export default ProductListTabsReducer;
