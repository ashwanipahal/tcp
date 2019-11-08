import { POINTS_HISTORY_ACTION_PATTERN } from '../../../../../../constants/reducer.constants';

const REWARDSPOINTS_CONSTANTS = {
  GET_POINTSHISTORY_LIST: `${POINTS_HISTORY_ACTION_PATTERN}GET_POINTSHISTORY_LIST`,
  SET_POINTSHISTORY_LIST: `${POINTS_HISTORY_ACTION_PATTERN}SET_POINTSHISTORY_LIST`,
  GET_POINTSHISTORY_LIST_TTL: 30 * 1000,
  POINT_TO: '3',
  SET_MODULEX_CONTENT: `${POINTS_HISTORY_ACTION_PATTERN}ADD_MODULEX_CONTENT`,
  FETCH_MODULEX_CONTENT: `${POINTS_HISTORY_ACTION_PATTERN}FETCH_MODULEX_CONTENT`,
  SHOW_LOADER: `${POINTS_HISTORY_ACTION_PATTERN}SHOW_LOADER`,
};

export default REWARDSPOINTS_CONSTANTS;
