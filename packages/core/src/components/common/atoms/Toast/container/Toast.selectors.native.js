import { TOAST_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

const getToastMsgResponse = state => {
  return state[TOAST_REDUCER_KEY].get('toastMessage');
};

const getToastMsgPosition = state => {
  return state[TOAST_REDUCER_KEY].get('toastMessagePosition');
};

export { getToastMsgResponse, getToastMsgPosition };
