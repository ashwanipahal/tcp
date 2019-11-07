import promotionBannerSelectors from '../PromotionBanner.selectors';

describe('#Added to bag Selectors', () => {
  const state = {
    Labels: {
      global: {
        bossPromotions: {},
      },
    },
  };

  it('#getPickupPromotionBannerLabels should return labels', () => {
    expect(promotionBannerSelectors.getPickupPromotionBannerLabels(state)).toEqual({});
  });
});
