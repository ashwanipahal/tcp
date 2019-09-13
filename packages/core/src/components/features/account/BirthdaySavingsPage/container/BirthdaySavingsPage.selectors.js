/**
 * This selector function will return profile subCategory labels
 * @param {*} state redux state object
 */
export const getProfileLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.profile;
};

export default getProfileLabels;
