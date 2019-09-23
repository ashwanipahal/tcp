import { QUICK_VIEW_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

const SET_QUICK_VIEW = `${QUICK_VIEW_ACTION_PATTERN}SET_QUICK_VIEW`;
const FETCH_QUICK_VIEW = `${QUICK_VIEW_ACTION_PATTERN}FETCH_QUICK_VIEW`;
const OPEN_QUICK_VIEW_MODAL = `${QUICK_VIEW_ACTION_PATTERN}OPEN_QUICK_VIEW_MODAL`;
const CLOSE_QUICK_VIEW_MODAL = `${QUICK_VIEW_ACTION_PATTERN}CLOSE_QUICK_VIEW_MODAL`;

const QUICK_VIEW_CONSTANT = {
  SET_QUICK_VIEW,
  FETCH_QUICK_VIEW,
  OPEN_QUICK_VIEW_MODAL,
  CLOSE_QUICK_VIEW_MODAL,
};

export default QUICK_VIEW_CONSTANT;
