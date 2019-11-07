import promotionBannerSelectors from '../PromotionBanner.selectors';

describe('#Added to bag Selectors', () => {
  const state = {
    global: {
      bossPromotions: {
        lbl_banner_boss_disc_tcp_default: '5',
        lbl_banner_boss_disc_tcp_A: '6',
        lbl_banner_boss_disc_tcp_B: '10',
        lbl_banner_boss_disc_tcp_C: '15',
        lbl_banner_boss_disc_gym_default: '6',
        lbl_banner_boss_disc_gym_A: '7',
        lbl_banner_boss_disc_gym_B: '12',
        lbl_banner_boss_disc_gym_C: '15',
        lbl_banner_boss_text: 'EXTRA $tcpSegmentValue$% OFF',
        lbl_fullBleed_banner_boss_text: 'PICK UP IN STORE AND SAVE AN EXTRA $tcpSegmentValue$%',
      },
    },
  };

  it('#getPickupPromotionBannerLabels should return labels', () => {
    expect(promotionBannerSelectors.getPickupPromotionBannerLabels(state)).toEqual({
      lbl_banner_boss_disc_tcp_default: 'lbl_banner_boss_disc_tcp_default',
      lbl_banner_boss_disc_tcp_A: 'lbl_banner_boss_disc_tcp_A',
      lbl_banner_boss_disc_tcp_B: 'lbl_banner_boss_disc_tcp_B',
      lbl_banner_boss_disc_tcp_C: 'lbl_banner_boss_disc_tcp_C',
      lbl_banner_boss_disc_gym_default: 'lbl_banner_boss_disc_gym_default',
      lbl_banner_boss_disc_gym_A: 'lbl_banner_boss_disc_gym_A',
      lbl_banner_boss_disc_gym_B: 'lbl_banner_boss_disc_gym_B',
      lbl_banner_boss_disc_gym_C: 'lbl_banner_boss_disc_gym_C',
      lbl_banner_boss_text: 'lbl_banner_boss_text',
      lbl_fullBleed_banner_boss_text: 'lbl_fullBleed_banner_boss_text',
    });
  });
});
