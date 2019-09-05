import constants from './ProductTabList.constants';

export const productTabListDataReq = (payload = {}) => {
  return {
    type: constants.PRODUCT_TAB_LIST_REQ,
    payload,
  };
};

export const productTabListDataSuccess = (payload = {}) => {
  return {
    type: constants.PRODUCT_TAB_LIST_SUCCESS,
    payload,
  };
};

export const productTabListDataFail = (payload = {}) => {
  return {
    type: constants.PRODUCT_TAB_LIST_FAIL,
    payload,
  };
};

export default {
  productTabListDataReq,
  productTabListDataSuccess,
  productTabListDataFail,
};
