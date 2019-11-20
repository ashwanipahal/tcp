import { PRODUCTLISTING_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

const SET_PRODUCTS = `${PRODUCTLISTING_ACTION_PATTERN}SET_PLP_PRODUCTS`;
const FETCH_PRODUCTS = `${PRODUCTLISTING_ACTION_PATTERN}GET_PLP_PRODUCTS`;
const GET_MORE_PRODUCTS = `${PRODUCTLISTING_ACTION_PATTERN}GET_MORE_PRODUCTS`;
const SET_FIRST_PRODUCTS_PAGE = `${PRODUCTLISTING_ACTION_PATTERN}SET_FIRST_PRODUCTS_PAGE`;
const SET_PLP_LOADING_STATE = `${PRODUCTLISTING_ACTION_PATTERN}SET_PLP_LOADING_STATE`;
const SET_ADD_TO_FAVORITE = `${PRODUCTLISTING_ACTION_PATTERN}SET_ADD_TO_FAVORITE`;
const RESET_PRODUCTS = `${PRODUCTLISTING_ACTION_PATTERN}RESET_PRODUCTS`;
const SET_FILTER = `${PRODUCTLISTING_ACTION_PATTERN}SET_FILTER`;
const SET_FIRST_PRODUCTS_PAGE_SSR = `${PRODUCTLISTING_ACTION_PATTERN}SET_FIRST_PRODUCTS_PAGE_SSR`;
const SET_LOYALTY_BANNER = `${PRODUCTLISTING_ACTION_PATTERN}SET_LOYALTY_BANNER`;
export const PRODUCTS_PER_LOAD = 20; // TODO - change this to config value. the number of products to load on each call to BE (as the user scrolls)
export const DESCRIPTION_FILTER = 'auxdescription_uFilter';

export const routingInfoStoreView = {
  getOriginImgHostSetting: () => {
    return 'https://test4.childrensplace.com';
  },
};

const PRODUCTLISTING_CONSTANTS = {
  SET_PRODUCTS,
  FETCH_PRODUCTS,
  GET_MORE_PRODUCTS,
  SET_FIRST_PRODUCTS_PAGE,
  SET_PLP_LOADING_STATE,
  RESET_PRODUCTS,
  SET_FIRST_PRODUCTS_PAGE_SSR,
  SET_LOYALTY_BANNER,
  SET_ADD_TO_FAVORITE,
  SET_FILTER,
};

export default PRODUCTLISTING_CONSTANTS;
