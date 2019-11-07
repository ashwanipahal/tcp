import GLOBAL_CONSTANTS from '../constants';

export const loadLayoutData = (payload, layoutName) => {
  return {
    payload,
    layoutName,
    type: GLOBAL_CONSTANTS.LOAD_LAYOUT_DATA,
  };
};

export const loadLabelsData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.LOAD_LABELS_DATA,
  };
};
export const setLabelsData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_LABELS_DATA,
  };
};

export const loadComponentLabelsData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.LOAD_COMPONENT_LABELS_DATA,
  };
};

export const loadSEOData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.LOAD_SEO_DATA,
  };
};
export const setSEOData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_SEO_DATA,
  };
};

export const loadPageSEOData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.LOAD_PAGE_SEO_DATA,
  };
};

export const loadXappConfigData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_XAPP_CONFIG,
  };
};

export const loadXappConfigDataOtherBrand = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_XAPP_CONFIG_OTHER_BRAND,
  };
};

export const setBossBopisFlags = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_BOSS_BOPIS_FLAGS,
  };
};

export const setAPIConfig = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_API_CONFIG,
  };
};

export const siteConfigData = payload => {
  return {
    type: GLOBAL_CONSTANTS.SITE_CONFIG,
    payload,
  };
};

export const bootstrapData = payload => {
  return {
    type: GLOBAL_CONSTANTS.BOOTSTRAP_API,
    payload,
  };
};

export const loadModulesData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.LOAD_MODULES_DATA,
  };
};

export const getCountryListData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.COUNTRY_LIST_GET_DATA,
  };
};

export const storeCountriesMap = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.COUNTRY_LIST_STORE_COUNTRIES_MAP,
  };
};

export const storeCurrenciesMap = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.COUNTRY_LIST_STORE_CURRENCIES_MAP,
  };
};

export const setCountry = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_COUNTRY,
  };
};

export const setCurrency = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_CURRENCY,
  };
};

export const setLanguage = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_LANGUAGE,
  };
};

export const setDeviceInfo = payload => ({
  payload,
  type: GLOBAL_CONSTANTS.SET_DEVICE_INFO,
});

export const setOptimizelyFeaturesList = payload => ({
  payload,
  type: GLOBAL_CONSTANTS.SET_OPTIMIZELY_FEATURES_LIST,
});

export const fetchPageLayout = (payload, layoutName) => {
  return {
    payload,
    layoutName,
    type: GLOBAL_CONSTANTS.FETCH_PAGE_LAYOUT,
  };
};

export default {
  loadLayoutData,
  loadLabelsData,
  setLabelsData,
  loadComponentLabelsData,
  bootstrapData,
  loadModulesData,
  getCountryListData,
  storeCountriesMap,
  storeCurrenciesMap,
  setCountry,
  setCurrency,
  setLanguage,
  setBossBopisFlags,
};
