export const getCommonLabels = state => {
  return state.Labels.account.common;
};

export const getPointHistoryState = state => {
  return state.pointHistoryReducer.get('pointsHistoryData');
};
