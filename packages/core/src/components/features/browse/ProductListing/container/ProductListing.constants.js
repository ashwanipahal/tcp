import { PRODUCTLISTINGPAGE_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

const SET_PRODUCTS = `${PRODUCTLISTINGPAGE_ACTION_PATTERN}SET_PLP_PRODUCTS`;
const FETCH_PRODUCTS = `${PRODUCTLISTINGPAGE_ACTION_PATTERN}GET_PLP_PRODUCTS`;
const GET_MORE_PRODUCTS = `${PRODUCTLISTINGPAGE_ACTION_PATTERN}GET_MORE_PRODUCTS`;
const SET_FIRST_PRODUCTS_PAGE = `${PRODUCTLISTINGPAGE_ACTION_PATTERN}SET_FIRST_PRODUCTS_PAGE`;
const SET_PLP_LOADING_STATE = `${PRODUCTLISTINGPAGE_ACTION_PATTERN}SET_PLP_LOADING_STATE`;
export const PRODUCTS_PER_LOAD = 20; // TODO - change this to config value. the number of products to load on each call to BE (as the user scrolls)

const PRODUCTLISTING_CONSTANTS = {
  SET_PRODUCTS,
  FETCH_PRODUCTS,
  GET_MORE_PRODUCTS,
  SET_FIRST_PRODUCTS_PAGE,
  SET_PLP_LOADING_STATE,
};

export default PRODUCTLISTING_CONSTANTS;
