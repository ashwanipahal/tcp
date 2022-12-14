import {
  APICONFIG_ACTION_PATTERN,
  SESSIONCONFIG_ACTION_PATTERN,
} from '../../constants/reducer.constants';

export default {
  XAPP_CONFIG_MODULE: 'xappConfig',
  BOOTSTRAP_API: 'BOOTSTRAP_API',
  SITE_CONFIG: 'SITE_CONFIG',
  SET_API_CONFIG: `${APICONFIG_ACTION_PATTERN}SET_API_CONFIG`,
  SET_PREVIEW_DATE: `${APICONFIG_ACTION_PATTERN}SET_PREVIEW_DATE`,
  GET_MODULEX_CONTENT: 'GET_MODULEX_CONTENT',
  SET_MODULEX_CONTENT: 'SET_MODULEX_CONTENT',
  LOAD_LAYOUT_DATA: 'LOAD_LAYOUT_DATA',
  LOAD_LABELS_DATA: 'LOAD_LABELS_DATA',
  SET_LABELS_DATA: 'SET_LABELS_DATA',
  LOAD_COMPONENT_LABELS_DATA: 'LOAD_COMPONENT_LABELS_DATA',
  LOAD_SEO_DATA: 'LOAD_SEO_DATA',
  SET_SEO_DATA: 'SET_SEO_DATA',
  LOAD_PAGE_SEO_DATA: 'LOAD_PAGE_SEO_DATA',
  LOAD_MODULES_DATA: 'LOAD_MODULES_DATA',
  LOAD_USER_DATA: 'GET_USER_INFO',
  SET_XAPP_CONFIG: `${SESSIONCONFIG_ACTION_PATTERN}SET_XAPP_CONFIG`,
  SET_XAPP_CONFIG_OTHER_BRAND: `${SESSIONCONFIG_ACTION_PATTERN}SET_XAPP_CONFIG_OTHER_BRAND`,
  SET_BOSS_BOPIS_FLAGS: `${SESSIONCONFIG_ACTION_PATTERN}SET_BOSS_BOPIS_FLAGS`,
  SET_COUNTRY: `${SESSIONCONFIG_ACTION_PATTERN}SET_COUNTRY`,
  SET_LANGUAGE: `${SESSIONCONFIG_ACTION_PATTERN}SET_LANGUAGE`,
  SET_CURRENCY: `${SESSIONCONFIG_ACTION_PATTERN}SET_CURRENCY`,
  COUNTRY_LIST_GET_DATA: `${SESSIONCONFIG_ACTION_PATTERN}COUNTRY_LIST_GET_DATA`,
  COUNTRY_LIST_STORE_COUNTRIES_MAP: `${SESSIONCONFIG_ACTION_PATTERN}COUNTRY_LIST_STORE_COUNTRIES_MAP`,
  COUNTRY_LIST_STORE_CURRENCIES_MAP: `${SESSIONCONFIG_ACTION_PATTERN}COUNTRY_LIST_STORE_CURRENCIES_MAP`,
  GET_SET_TCP_SEGMENT: `${SESSIONCONFIG_ACTION_PATTERN}GET_SET_TCP_SEGMENT`,
  SET_TCP_SEGMENT_METHOD_CALL: `${SESSIONCONFIG_ACTION_PATTERN}SET_TCP_SEGMENT_METHOD_CALL`,
  SET_DEVICE_INFO: 'SET_DEVICE_INFO',
  SET_OPTIMIZELY_FEATURES_LIST: 'SET_OPTIMIZELY_FEATURES_LIST',
  FETCH_PAGE_LAYOUT: 'FETCH_PAGE_LAYOUT',
  SET_SUB_NAVIGATION_DATA: 'SET_SUB_NAVIGATION_DATA',
  GET_SUB_NAVIGATION_DATA: 'GET_SUB_NAVIGATION_DATA',
  SET_COUNTRY_NAME: 'SET_COUNTRY_NAME',
};

export const LABELS = {
  labels: 'labels',
  global: 'global',
  modules: 'modules',
  account: 'account',
  bagPage: 'bag',
  checkout: 'checkout',
};

export const SEO_DATA = {
  seoData: 'seoData',
  home: '/home',
  account: '/account',
  bag: '/bag',
  checkout: '/checkout',
  search: '/search',
};

export const MODULES_CONSTANT = {
  placeholder: 'placeholder',
  subNavigation: 'SubNavigation',
};
