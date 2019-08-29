import { APICONFIG_ACTION_PATTERN } from '../../constants/reducer.constants';

export default {
  BOOTSTRAP_API: 'BOOTSTRAP_API',
  SET_API_CONFIG: `${APICONFIG_ACTION_PATTERN}SET_API_CONFIG`,
  LOAD_LAYOUT_DATA: 'LOAD_LAYOUT_DATA',
  LOAD_LABELS_DATA: 'LOAD_LABELS_DATA',
  SET_LABELS_DATA: 'SET_LABELS_DATA',
  LOAD_COMPONENT_LABELS_DATA: 'LOAD_COMPONENT_LABELS_DATA',
  LOAD_MODULES_DATA: 'LOAD_MODULES_DATA',
  LOAD_USER_DATA: 'GET_USER_INFO',
};

export const LABELS = {
  labels: 'labels',
  global: 'global',
  modules: 'modules',
  account: 'account',
};
