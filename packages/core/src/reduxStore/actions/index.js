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

export const loadUserProfile = () => {
  return {
    type: GLOBAL_CONSTANTS.LOAD_USER_DATA,
  };
};

export default {
  loadLayoutData,
  loadLabelsData,
  setLabelsData,
  loadComponentLabelsData,
  bootstrapData,
  loadModulesData,
  loadUserProfile,
};
