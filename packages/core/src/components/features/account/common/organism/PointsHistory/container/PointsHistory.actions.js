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
