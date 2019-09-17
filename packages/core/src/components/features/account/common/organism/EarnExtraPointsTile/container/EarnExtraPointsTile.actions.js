import EARNEXTRAPOINTS_CONSTANTS from '../EarnExtraPointsTile.constants';

export const getEarnExtraPointsList = () => {
  return {
    type: EARNEXTRAPOINTS_CONSTANTS.GET_EARNEXTRAPOINTS_LIST,
  };
};

export const setEarnExtraPointsList = extraPointsData => {
  return {
    type: EARNEXTRAPOINTS_CONSTANTS.SET_EARNEXTRAPOINTS_LIST,
    payload: extraPointsData,
  };
};
