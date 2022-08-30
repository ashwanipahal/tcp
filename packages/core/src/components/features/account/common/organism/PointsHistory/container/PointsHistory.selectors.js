import { createSelector } from 'reselect';
import { POINTS_HISTORY_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getCommonLabels = state => {
  return state.Labels.account.common;
};

const getState = state => state[POINTS_HISTORY_REDUCER_KEY];

export const getPointHistoryState = state => {
  return state.pointHistoryReducer.get('pointsHistoryData');
};

export const getPointHistoryRichTextContentId = state => {
  let pointHistoryRichTextContentId;
  if (
    state.Labels.global.placeRewards &&
    Array.isArray(state.Labels.global.placeRewards.referred)
  ) {
    state.Labels.global.placeRewards.referred.forEach(label => {
      if (label.name === 'Point History Content') pointHistoryRichTextContentId = label.contentId;
    });
  }
  return pointHistoryRichTextContentId;
};

export const getPointHistoryRichTextSelector = state => {
  return state.pointHistoryReducer.get('pointsHistoryRichText');
};

export const getPointHistoryDataFetchingState = createSelector(
  getState,
  state => state && state.get('isFetching')
);
