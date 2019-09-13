export const getCommonLabels = state => {
  return state.Labels.account.common;
};

export const getPointHistoryState = state => {
  return state.pointHistoryReducer.get('pointsHistoryData');
};

export const getPointHistoryRichTextContentId = state => {
  let pointHistoryRichTextContentId;
  if (
    state.Labels.account.myPlaceRewards &&
    Array.isArray(state.Labels.account.myPlaceRewards.referred)
  ) {
    state.Labels.account.myPlaceRewards.referred.forEach(label => {
      if (label.name === 'Bonus Points Days Details')
        pointHistoryRichTextContentId = label.contentId;
    });
  }
  return pointHistoryRichTextContentId;
};

export const getPointHistoryRichTextSelector = state => {
  return state.pointHistoryReducer.get('pointsHistoryRichText');
};
