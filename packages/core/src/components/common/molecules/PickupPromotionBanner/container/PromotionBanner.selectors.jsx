import { getLabelValue } from '@tcp/core/src/utils';

const getPickupPromotionBannerLabels = state => {
  return {
    lbl_banner_boss_text: getLabelValue(
      state.Labels,
      'lbl_banner_boss_text',
      'bossPromotions',
      'global'
    ),
    lbl_fullBleed_banner_boss_text: getLabelValue(
      state.Labels,
      'lbl_fullBleed_banner_boss_text',
      'bossPromotions',
      'global'
    ),
    lbl_banner_boss_disc_tcp_default: getLabelValue(
      state.Labels,
      'lbl_banner_boss_disc_tcp_default',
      'bossPromotions',
      'global'
    ),
    lbl_banner_boss_disc_tcp_A: getLabelValue(
      state.Labels,
      'lbl_banner_boss_disc_tcp_A',
      'bossPromotions',
      'global'
    ),
    lbl_banner_boss_disc_tcp_B: getLabelValue(
      state.Labels,
      'lbl_banner_boss_disc_tcp_B',
      'bossPromotions',
      'global'
    ),
    lbl_banner_boss_disc_tcp_C: getLabelValue(
      state.Labels,
      'lbl_banner_boss_disc_tcp_C',
      'bossPromotions',
      'global'
    ),
    lbl_banner_boss_disc_gym_default: getLabelValue(
      state.Labels,
      'lbl_banner_boss_disc_gym_default',
      'bossPromotions',
      'global'
    ),
    lbl_banner_boss_disc_gym_A: getLabelValue(
      state.Labels,
      'lbl_banner_boss_disc_gym_A',
      'bossPromotions',
      'global'
    ),
    lbl_banner_boss_disc_gym_B: getLabelValue(
      state.Labels,
      'lbl_banner_boss_disc_gym_B',
      'bossPromotions',
      'global'
    ),
    lbl_banner_boss_disc_gym_C: getLabelValue(
      state.Labels,
      'lbl_banner_boss_disc_gym_C',
      'bossPromotions',
      'global'
    ),
  };
};

export default {
  getPickupPromotionBannerLabels,
};
