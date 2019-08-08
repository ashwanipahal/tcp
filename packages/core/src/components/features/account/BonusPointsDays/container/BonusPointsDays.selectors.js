export const getLabels = state => state.Labels.account;
export const getBonusData = state => state.BonusPointsDaysReducer.get('bonusDaysData');
export const getIsFetching = state => state.BonusPointsDaysReducer.get('isFetching');
export const getError = state => state.BonusPointsDaysReducer.get('error');
export const getBonusDetailsContentId = state => {
  let bonusDetailsCID;
  /* istanbul ignore else */
  if (
    state.Labels.account.myPlaceRewards &&
    Array.isArray(state.Labels.account.myPlaceRewards.referred)
  ) {
    state.Labels.account.myPlaceRewards.referred.forEach(label => {
      /* istanbul ignore else */
      if (label.name === 'Bonus Points Days Details') bonusDetailsCID = label.contentId;
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
