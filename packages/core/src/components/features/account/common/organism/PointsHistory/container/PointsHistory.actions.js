import POINTSHISTORY_CONSTANTS from '../PointsHistory.constants';

export const getPointsHistoryList = () => {
  return {
    type: POINTSHISTORY_CONSTANTS.GET_POINTSHISTORY_LIST,
  };
};

export const setPointsHistoryList = pointsHistoryData => {
  return {
    type: POINTSHISTORY_CONSTANTS.SET_POINTSHISTORY_LIST,
    payload: pointsHistoryData,
  };
};

export const fetchModuleX = payload => {
  return {
    payload,
    type: POINTSHISTORY_CONSTANTS.FETCH_MODULEX_CONTENT,
  };
};

export const setModuleX = payload => {
  return {
    payload,
    type: POINTSHISTORY_CONSTANTS.SET_MODULEX_CONTENT,
  };
};
