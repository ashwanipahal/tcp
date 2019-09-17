export const getCommonLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.common;
};

export const getEarnExtraPointsDataState = state => {
  return state.earnExtraPointsReducer && state.earnExtraPointsReducer.get('earnExtraPointsData');
};
