import { NAVIGATION_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

export const FETCH_NAVIGATION_DATA = `${NAVIGATION_ACTION_PATTERN}FETCH_NAVIGATION_DATA`;

export default {
  FETCH_NAVIGATION_DATA,
  LOAD_NAVIGATION_DATA: `${NAVIGATION_ACTION_PATTERN}LOAD_NAVIGATION_DATA`,
  OPEN_L2_PANEL: `${NAVIGATION_ACTION_PATTERN}OPEN_L2_PANEL`,
  OPEN_L2_DRAWER: `${NAVIGATION_ACTION_PATTERN}OPEN_L2_DRAWER`,
  HIDE_L2_DRAWER: `${NAVIGATION_ACTION_PATTERN}HIDE_L2_DRAWER`,
  OPEN_L3_DRAWER: `${NAVIGATION_ACTION_PATTERN}OPEN_L3_DRAWER`,
  HIDE_L3_DRAWER: `${NAVIGATION_ACTION_PATTERN}HIDE_L3_DRAWER`,
  HIDE_ALL_DRAWERS: `${NAVIGATION_ACTION_PATTERN}HIDE_ALL_DRAWERS`,
  HIDE_NAVIGATION_FOOTER: `${NAVIGATION_ACTION_PATTERN}HIDE_NAVIGATION_FOOTER`,
  SHOW_NAVIGATION_FOOTER: `${NAVIGATION_ACTION_PATTERN}SHOW_NAVIGATION_FOOTER`,
  REMOVE_L1_FOCUS: `${NAVIGATION_ACTION_PATTERN}REMOVE_L1_FOCUS`,
};
