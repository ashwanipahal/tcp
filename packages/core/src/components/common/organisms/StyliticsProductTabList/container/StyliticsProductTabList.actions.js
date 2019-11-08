import constants from './StyliticsProductTabList.constants';

export const styliticsProductTabListDataReq = (payload = {}) => {
  return {
    type: constants.STYLITICS_PRODUCT_TAB_LIST_REQ,
    payload,
  };
};

export const styliticsProductTabListDataReqforOutfit = (payload = {}) => {
  return {
    type: constants.STYLITICS_PRODUCT_TAB_LIST_REQ_OUTFIT,
    payload,
  };
};

export const styliticsProductTabListDataSuccess = (payload = {}) => {
  return {
    type: constants.STYLITICS_PRODUCT_TAB_LIST_SUCCESS,
    payload,
  };
};

export const styliticsProductTabListDataFail = (payload = {}) => {
  return {
    type: constants.STYLITICS_PRODUCT_TAB_LIST_FAIL,
    payload,
  };
};

export const isFetchingDataForOutfit = (payload = false) => {
  return {
    type: constants.IS_FETCHING_DATA_FOR_OUTFIT,
    payload,
  };
};

export default {
  styliticsProductTabListDataReq,
  styliticsProductTabListDataReqforOutfit,
  styliticsProductTabListDataSuccess,
  styliticsProductTabListDataFail,
};
