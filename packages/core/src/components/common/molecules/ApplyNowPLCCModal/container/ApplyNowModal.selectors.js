import { createSelector } from 'reselect';
import { APPLY_NOW_MODAL_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getApplyNowModalState = state => {
  return state[APPLY_NOW_MODAL_REDUCER_KEY];
};

export const getIsModalOpen = state => {
  const modalStatus = getApplyNowModalState(state).get('modalStatus');
  return modalStatus && modalStatus.isModalOpen;
};

export const getIsPLCCModalOpen = state => {
  const modalStatus = getApplyNowModalState(state).get('modalStatus');
  return modalStatus && modalStatus.isPLCCModalOpen;
};

export const getLabels = state => {
  return state.Labels.global && state.Labels.global.plccForm;
};

export const applyCardLabels = state => state.ApplyCardPage && state.ApplyCardPage.plccData;

export const getRtpsMessages = createSelector(
  applyCardLabels,
  labels => {
    return {
      rtpsCongratsMsg: labels && labels.rtps_congralutaions_msg,
      rtpsOptOutMsg: labels && labels.rtps_opt_out_notice,
      rtpsTextTerms: labels && labels.rtps_text_terms,
    };
  }
);
