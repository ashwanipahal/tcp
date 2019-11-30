import { QUICK_VIEW_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

const SET_QUICK_VIEW = `${QUICK_VIEW_ACTION_PATTERN}SET_QUICK_VIEW`;
const FETCH_QUICK_VIEW = `${QUICK_VIEW_ACTION_PATTERN}FETCH_QUICK_VIEW`;
const OPEN_QUICK_VIEW_MODAL = `${QUICK_VIEW_ACTION_PATTERN}OPEN_QUICK_VIEW_MODAL`;
const CLOSE_QUICK_VIEW_MODAL = `${QUICK_VIEW_ACTION_PATTERN}CLOSE_QUICK_VIEW_MODAL`;
const SET_ITEM_FROM_BAG_INFO = `${QUICK_VIEW_ACTION_PATTERN}SET_ITEM_FROM_BAG_INFO`;
const SET_COLOR_PRODUCT_ID = `${QUICK_VIEW_ACTION_PATTERN}SET_COLOR_PRODUCT_ID`;
const SET_LOADING_STATE = `${QUICK_VIEW_ACTION_PATTERN}SET_LOADING_STATE`;
const UPDATE_APP_TYPE_AND_REDIRECT = 'updateAppTypeAndRedirect';

const QUICK_VIEW_CONSTANT = {
  SET_QUICK_VIEW,
  FETCH_QUICK_VIEW,
  OPEN_QUICK_VIEW_MODAL,
  CLOSE_QUICK_VIEW_MODAL,
  SET_ITEM_FROM_BAG_INFO,
  SET_COLOR_PRODUCT_ID,
  SET_LOADING_STATE,
  UPDATE_APP_TYPE_AND_REDIRECT,
};

export default QUICK_VIEW_CONSTANT;
