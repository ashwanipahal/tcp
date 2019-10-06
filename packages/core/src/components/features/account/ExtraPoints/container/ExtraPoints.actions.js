import EXTRA_POINTS_CONSTANTS from '../ExtraPoints.constants';

export const fetchModuleX = payload => {
  return {
    payload,
    type: EXTRA_POINTS_CONSTANTS.FETCH_MODULEX_CONTENT,
  };
};

export const setModuleX = payload => {
  return {
    payload,
    type: EXTRA_POINTS_CONSTANTS.SET_MODULEX_CONTENT,
  };
};
