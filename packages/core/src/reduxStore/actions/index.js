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

export const setAPIConfig = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.SET_API_CONFIG,
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

export default {
  loadLayoutData,
  loadLabelsData,
  bootstrapData,
  loadModulesData,
  setCountry,
  setCurrency,
  setLanguage,
};
