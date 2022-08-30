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

const toastMessagePosition = payload => {
  return {
    type: TOAST_CONSTANTS.TOAST_MESSAGE_POSITION,
    payload,
  };
};

export { toastMessageInfo, resetToastMsg, toastMessagePosition };
