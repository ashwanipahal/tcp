export const getLabels = state => {
  return state.Labels.global && state.Labels.global.plccForm;
};

export default getLabels;
