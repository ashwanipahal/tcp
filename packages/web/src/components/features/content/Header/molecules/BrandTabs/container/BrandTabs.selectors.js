import { getLabelValue } from '@tcp/core/src/utils';

const getTcpBrandName = state =>
  getLabelValue(state.Labels, 'lbl_brandlogo_tcpAltText', 'accessibility', 'global');

const getGymBrandName = state =>
  getLabelValue(state.Labels, 'lbl_brandlogo_gymAltText', 'accessibility', 'global');

export default {
  getTcpBrandName,
  getGymBrandName,
};
