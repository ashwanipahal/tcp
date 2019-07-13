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

export const bootstrapData = pageInfo => {
  return {
    type: GLOBAL_CONSTANTS.BOOTSTRAP_API,
    pageInfo,
  };
};

export const loadModulesData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.LOAD_MODULES_DATA,
  };
};

export default {
  loadLayoutData,
  loadLabelsData,
  bootstrapData,
  loadModulesData,
};
