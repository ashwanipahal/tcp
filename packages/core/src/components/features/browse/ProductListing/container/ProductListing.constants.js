import { PRODUCTLISTINGPAGE_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

const SET_PRODUCTS = `${PRODUCTLISTINGPAGE_ACTION_PATTERN}SET_PLP_PRODUCTS`;
const FETCH_PRODUCTS = `${PRODUCTLISTINGPAGE_ACTION_PATTERN}GET_PLP_PRODUCTS`;
export const PRODUCTS_PER_LOAD = 20; // TODO - change this to config value. the number of products to load on each call to BE (as the user scrolls)

const PRODUCTLISTING_CONSTANTS = {
  SET_PRODUCTS,
  FETCH_PRODUCTS,
};

export default PRODUCTLISTING_CONSTANTS;
