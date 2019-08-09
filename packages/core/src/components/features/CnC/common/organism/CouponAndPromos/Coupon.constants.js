import { COUPON_ACTION_PATTERN } from '../../../../../../constants/reducer.constants';

const COUPON_CONSTANTS = {
  SHOW_LOADER: `${COUPON_ACTION_PATTERN}SHOW_LOADER`,
  HIDE_LOADER: `${COUPON_ACTION_PATTERN}HIDE_LOADER`,
  APPLY_COUPON: `${COUPON_ACTION_PATTERN}APPLY_COUPON`,
  GET_COUPON_LIST: `${COUPON_ACTION_PATTERN}GET_COUPON_LIST`,
  REMOVE_COUPON: `${COUPON_ACTION_PATTERN}REMOVE_COUPON`,
  SET_STATUS_COUPON: `${COUPON_ACTION_PATTERN}SET_STATUS_COUPON`,
};

export default COUPON_CONSTANTS;
