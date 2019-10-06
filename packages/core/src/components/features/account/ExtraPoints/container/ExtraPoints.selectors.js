import { EXTRA_POINTS_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getExtraPointsTilesContentId = state => {
  let extraPointsTilesContentIds = [];
  if (
    state.Labels.account.earnExtraPoints &&
    Array.isArray(state.Labels.account.earnExtraPoints.referred)
  ) {
    extraPointsTilesContentIds = state.Labels.account.earnExtraPoints.referred[0].contentId;
  }
  return extraPointsTilesContentIds;
};

export const getPromoListDetails = state => {
  return state[EXTRA_POINTS_REDUCER_KEY].get('promoListDetails');
};
