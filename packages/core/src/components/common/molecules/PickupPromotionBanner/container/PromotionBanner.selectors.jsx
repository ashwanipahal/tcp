import { getLabelValue } from '@tcp/core/src/utils/utils';

const getPickupPromotionBannerLabels = state => {
  const labelValue = state.Labels && state.Labels.global && state.Labels.global.bossPromotions;
  return labelValue || {};
};

export default {
  getPickupPromotionBannerLabels,
};
