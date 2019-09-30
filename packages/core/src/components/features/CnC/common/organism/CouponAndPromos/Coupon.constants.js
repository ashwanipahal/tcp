import { COUPON_ACTION_PATTERN } from '../../../../../../constants/reducer.constants';

const COUPON_CONSTANTS = {
  SHOW_LOADER: `${COUPON_ACTION_PATTERN}SHOW_LOADER`,
  HIDE_LOADER: `${COUPON_ACTION_PATTERN}HIDE_LOADER`,
  APPLY_COUPON: `${COUPON_ACTION_PATTERN}APPLY_COUPON`,
  GET_COUPON_LIST: `${COUPON_ACTION_PATTERN}GET_COUPON_LIST`,
  SET_COUPON_LIST: `${COUPON_ACTION_PATTERN}SET_COUPON_LIST`,
  CLEAR_COUPON_TTL: `${COUPON_ACTION_PATTERN}CLEAR_COUPON_TTL`,
  REMOVE_COUPON: `${COUPON_ACTION_PATTERN}REMOVE_COUPON`,
  SET_STATUS_COUPON: `${COUPON_ACTION_PATTERN}SET_STATUS_COUPON`,
  SET_ERROR: `${COUPON_ACTION_PATTERN}SET_ERROR`,
  RESET_COUPON_STATE: `${COUPON_ACTION_PATTERN}RESET_COUPON_STATE`,
  RESET_COUPON_REDUCER: `${COUPON_ACTION_PATTERN}RESET_COUPON_REDUCER`,
};

export default COUPON_CONSTANTS;
