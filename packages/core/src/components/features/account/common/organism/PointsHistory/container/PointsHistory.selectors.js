export const getLabels = state => {
  return state.Labels.account;
};

export const getPointHistoryState = state => {
  return state.pointHistoryReducer.get('pointsHistoryData');
};

