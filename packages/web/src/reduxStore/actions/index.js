import GLOBAL_CONSTANTS from '../constants';

export const loadLayoutData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.LOAD_LAYOUT_DATA,
  };
};

export const loadLabelsData = payload => {
  return {
    payload,
    type: GLOBAL_CONSTANTS.LOAD_LABELS_DATA,
  };
};

export const bootstrapData = () => {
  return {
    type: GLOBAL_CONSTANTS.BOOTSTRAP_API,
  };
};

export default {
  loadLayoutData,
  loadLabelsData,
  bootstrapData,
};
