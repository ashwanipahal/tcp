import { SEARCH_REDUCER_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

const SET_PRODUCTS = `${SEARCH_REDUCER_ACTION_PATTERN}SET_SLP_PRODUCTS`;
const FETCH_SLP_PRODUCTS = `${SEARCH_REDUCER_ACTION_PATTERN}GET_SLP_PRODUCTS`;
const GET_MORE_SLP_PRODUCTS = `${SEARCH_REDUCER_ACTION_PATTERN}GET_MORE_SLP_PRODUCTS`;
const SET_SLP_FIRST_PRODUCTS_PAGE = `${SEARCH_REDUCER_ACTION_PATTERN}SET_SLP_FIRST_PRODUCTS_PAGE`;
const SET_SLP_LOADING_STATE = `${SEARCH_REDUCER_ACTION_PATTERN}SET_SLP_LOADING_STATE`;
const SET_SLP_SEARCHTERM_STATE = `${SEARCH_REDUCER_ACTION_PATTERN}SET_SLP_SEARCHTERM_STATE`;
export const PRODUCTS_PER_LOAD = 20; // TODO - change this to config value. the number of products to load on each call to BE (as the user scrolls)
export const DESCRIPTION_FILTER = 'auxdescription_uFilter';

export const routingInfoStoreView = {
  getOriginImgHostSetting: () => {
    return 'https://test4.childrensplace.com';
  },
};

const SLP_CONSTANTS = {
  SET_PRODUCTS,
  FETCH_SLP_PRODUCTS,
  GET_MORE_SLP_PRODUCTS,
  SET_SLP_FIRST_PRODUCTS_PAGE,
  SET_SLP_LOADING_STATE,
  SET_SLP_SEARCHTERM_STATE,
};

export default SLP_CONSTANTS;
