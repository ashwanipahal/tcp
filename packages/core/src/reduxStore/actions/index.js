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

export const setDeviceInfo = payload => ({
  payload,
  type: GLOBAL_CONSTANTS.SET_DEVICE_INFO,
});

export const setOptimizelyFeaturesList = payload => ({
  payload,
  type: GLOBAL_CONSTANTS.SET_OPTIMIZELY_FEATURES_LIST,
});

export default {
  loadLayoutData,
  loadLabelsData,
  bootstrapData,
  loadModulesData,
};
