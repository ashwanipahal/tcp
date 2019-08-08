import REWARDSPOINTS_CONSTANTS from '../PointsHistory.constants';

export const getPointsHistoryList = () => {
  return (
  {
  type: REWARDSPOINTS_CONSTANTS.GET_ACCOUNT_NAVIGATION_LIST,
})};

export const setPointsHistoryList = pointsHistoryData => {
  return ({
  type: REWARDSPOINTS_CONSTANTS.SET_ACCOUNT_NAVIGATION_LIST12,
  pointsHistoryData,
})};
