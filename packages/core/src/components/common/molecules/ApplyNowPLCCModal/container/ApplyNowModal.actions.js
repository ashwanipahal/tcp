import APPLY_NOW_MODAL_CONSTANTS from './ApplyNowModal.constants';

export const toggleApplyNowModal = payload => {
  return {
    payload,
    type: APPLY_NOW_MODAL_CONSTANTS.APPLY_NOW_MODAL_TOGGLE,
  };
};

export default {
  toggleApplyNowModal,
};
