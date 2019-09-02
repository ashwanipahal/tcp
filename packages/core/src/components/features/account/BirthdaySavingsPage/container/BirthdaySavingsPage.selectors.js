export const getLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.profile;
};

export default getLabels;
