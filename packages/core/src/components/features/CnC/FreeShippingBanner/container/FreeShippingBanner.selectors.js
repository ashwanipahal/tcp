import { getLabelValue } from '@tcp/core/src/utils/utils';

export const getLabels = state => {
  return state.Labels.checkout.bagPage;
};

export const getAccessibilityLabels = state => {
  return {
    lbl_fast_shipping: getLabelValue(state.Labels, 'lbl_fast_shipping', 'accessibility', 'global'),
  };
};

export default {
  getLabels,
  getAccessibilityLabels,
};
