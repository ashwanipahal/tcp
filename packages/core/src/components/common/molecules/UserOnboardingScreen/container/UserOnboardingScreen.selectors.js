export const getAccountOverviewLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.accountOverview;
};

export default {
  getAccountOverviewLabels,
};
