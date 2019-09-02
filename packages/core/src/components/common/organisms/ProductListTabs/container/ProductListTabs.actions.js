import constants from './ProductListTabs.constants';

export const productListTabsDataReq = (payload = {}) => {
  return {
    type: constants.PRODUCT_LIST_TAB_REQ,
    payload,
  };
};

export const productListTabsDataSuccess = (payload = {}) => {
  return {
    type: constants.PRODUCT_LIST_TAB_SUCCESS,
    payload,
  };
};

export const productListTabsDataFail = (payload = {}) => {
  return {
    type: constants.PRODUCT_LIST_TAB_FAIL,
    payload,
  };
};

export default {
  productListTabsDataReq,
  productListTabsDataSuccess,
  productListTabsDataFail,
};
