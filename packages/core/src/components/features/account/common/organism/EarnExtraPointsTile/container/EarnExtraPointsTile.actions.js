import EARNEXTRAPOINTS_CONSTANTS from '../EarnExtraPointsTile.constants';

export const getEarnExtraPointsList = () => {
  return {
    type: EARNEXTRAPOINTS_CONSTANTS.GET_EARNEXTRAPOINTS_LIST,
  };
};

export const getEarnedPointsNotification = () => {
  return {
    type: EARNEXTRAPOINTS_CONSTANTS.GET_EARNEDPOINTS_NOTIFICATION,
  };
};

export const showLoader = () => {
  return {
    type: EARNEXTRAPOINTS_CONSTANTS.SHOW_LOADER,
  };
};

export const setEarnedPointsNotification = earnedPointsNotification => {
  return {
    type: EARNEXTRAPOINTS_CONSTANTS.SET_EARNEDPOINTS_NOTIFICATION,
    payload: earnedPointsNotification,
  };
};

export const setEarnExtraPointsList = extraPointsData => {
  return {
    type: EARNEXTRAPOINTS_CONSTANTS.SET_EARNEXTRAPOINTS_LIST,
    payload: extraPointsData,
  };
};
