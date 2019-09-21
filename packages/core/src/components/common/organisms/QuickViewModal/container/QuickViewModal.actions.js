import QUICK_VIEW_CONSTANTS from './QuickViewModal.constants';

export const setQuickView = payload => {
  return {
    type: QUICK_VIEW_CONSTANTS.SET_QUICK_VIEW,
    payload,
  };
};

export const openQuickViewWithValues = payload => {
  return {
    payload,
    type: QUICK_VIEW_CONSTANTS.FETCH_QUICK_VIEW,
  };
};

export const setModalState = payload => {
  return {
    payload,
    type: QUICK_VIEW_CONSTANTS.OPEN_QUICK_VIEW_MODAL,
  };
};

export const closeQuickViewModal = payload => {
  return {
    payload,
    type: QUICK_VIEW_CONSTANTS.CLOSE_QUICK_VIEW_MODAL,
  };
};
