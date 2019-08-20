import { USER_ACTION_PATTERN } from '../../../../constants/reducer.constants';

const USER_CONSTANTS = {
  SET_USER_INFO: `${USER_ACTION_PATTERN}SET_USER_INFO`,
  GET_USER_INFO: `${USER_ACTION_PATTERN}GET_USER_INFO`,
  RESET_USER_INFO: `${USER_ACTION_PATTERN}RESET_USER_INFO`,
  CLEAR_USER_INFO_TTL: `${USER_ACTION_PATTERN}CLEAR_USER_INFO_TTL`,
  GET_USER_INFO_TTL: 10 * 60 * 1000,
};

export default USER_CONSTANTS;
