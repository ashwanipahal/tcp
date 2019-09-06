import { APPLY_NOW_MODAL_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getApplyNowModalState = state => {
  return state[APPLY_NOW_MODAL_REDUCER_KEY];
};

export const getIsModalOpen = state => {
  return getApplyNowModalState(state).get('isModalOpen');
};

export const getLabels = state => {
  return state.Labels.PLCC && state.Labels.PLCC.plccForm;
};
