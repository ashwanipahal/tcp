import {
  APICONFIG_ACTION_PATTERN,
  SESSIONCONFIG_ACTION_PATTERN,
} from '../../constants/reducer.constants';

export default {
  XAPP_CONFIG_MODULE: 'xappConfig',
  BOOTSTRAP_API: 'BOOTSTRAP_API',
  SET_API_CONFIG: `${APICONFIG_ACTION_PATTERN}SET_API_CONFIG`,
  GET_MODULEX_CONTENT: 'GET_MODULEX_CONTENT',
  SET_MODULEX_CONTENT: 'SET_MODULEX_CONTENT',
  LOAD_LAYOUT_DATA: 'LOAD_LAYOUT_DATA',
  LOAD_LABELS_DATA: 'LOAD_LABELS_DATA',
  SET_LABELS_DATA: 'SET_LABELS_DATA',
  LOAD_COMPONENT_LABELS_DATA: 'LOAD_COMPONENT_LABELS_DATA',
  LOAD_MODULES_DATA: 'LOAD_MODULES_DATA',
  LOAD_USER_DATA: 'GET_USER_INFO',
  SET_XAPP_CONFIG: `${SESSIONCONFIG_ACTION_PATTERN}SET_XAPP_CONFIG`,
  SET_COUNTRY: `${SESSIONCONFIG_ACTION_PATTERN}SET_COUNTRY`,
  SET_LANGUAGE: `${SESSIONCONFIG_ACTION_PATTERN}SET_LANGUAGE`,
  SET_CURRENCY: `${SESSIONCONFIG_ACTION_PATTERN}SET_CURRENCY`,
  SET_DEVICE_INFO: 'SET_DEVICE_INFO',
  SET_OPTIMIZELY_FEATURES_LIST: 'SET_OPTIMIZELY_FEATURES_LIST',
};

export const LABELS = {
  labels: 'labels',
  global: 'global',
  modules: 'modules',
  account: 'account',
  bagPage: 'bag',
  checkout: 'checkout',
};
