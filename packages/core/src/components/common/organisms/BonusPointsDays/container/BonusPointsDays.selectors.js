import BONUS_POINTS_DAYS_CONSTANTS from '../BonusPointsDays.constants';

export const getLabels = state => state.Labels.global;
export const getBonusData = state => state.BonusPointsDaysReducer.get('bonusDaysData');
export const getIsFetching = state => state.BonusPointsDaysReducer.get('isFetching');
export const getError = state => state.BonusPointsDaysReducer.get('error');
export const getBonusDetailsContentId = state => {
  let bonusDetailsCID;
  /* istanbul ignore else */
  if (
    state.Labels.global.placeRewards &&
    Array.isArray(state.Labels.global.placeRewards.referred)
  ) {
    state.Labels.global.placeRewards.referred.forEach(label => {
      /* istanbul ignore else */
      if (label.name === BONUS_POINTS_DAYS_CONSTANTS.BONUS_DETAILS_REF_LABEL)
        bonusDetailsCID = label.contentId;
    });
  }
  return bonusDetailsCID;
};

export const getBonusDetailsData = state => {
  return state.BonusPointsDaysReducer.get('bonusPointsDetails');
};

export const getBonusPointsSwitch = state => {
  return (
    (state.session &&
      state.session.siteDetails &&
      state.session.siteDetails.isBonusPointsEnabled) ||
    true
  );
};
