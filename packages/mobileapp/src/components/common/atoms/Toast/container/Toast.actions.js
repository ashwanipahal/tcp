import TOAST_CONSTANTS from '../Toast.constants';

const toastMessageInfo = payload => {
  return {
    type: TOAST_CONSTANTS.TOAST_MESSAGE_INFO,
    payload,
  };
};

const resetToastMsg = payload => {
  return {
    type: TOAST_CONSTANTS.TOAST_MESSAGE_RESET,
    payload,
  };
};

export {toastMessageInfo , resetToastMsg};
