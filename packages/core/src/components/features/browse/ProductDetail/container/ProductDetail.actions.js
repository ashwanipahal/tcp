import PRODUCTDETAIL_ACTION_PATTERN from './ProductDetail.constants';

export const setProductDetails = payload => {
  return {
    type: PRODUCTDETAIL_ACTION_PATTERN.SET_PRODUCT_DETAILS,
    payload,
  };
};

export const getProductDetails = payload => {
  console.log('comes here 3 ', payload);
  return {
    type: PRODUCTDETAIL_ACTION_PATTERN.FETCH_PRODUCT_DETAILS,
    payload,
  };
};
