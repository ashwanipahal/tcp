export const getLabels = state => {
  return state.Labels.checkout.bagPage;
};

export const getAccessibilityLabels = state => {
  return state.Labels.global.accessibility;
};

export default {
  getLabels,
  getAccessibilityLabels,
};
