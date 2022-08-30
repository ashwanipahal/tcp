import { fromJS } from 'immutable';
import TOAST_CONSTANTS from '../Toast.constants';

const initialState = fromJS({
  toastMessage: null,
});

const ToastMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOAST_CONSTANTS.TOAST_MESSAGE_INFO:
      return state.set('toastMessage', action.payload);
    case TOAST_CONSTANTS.TOAST_MESSAGE_RESET:
      return state.set('toastMessage', null).set('toastMessagePosition', 0);
    case TOAST_CONSTANTS.TOAST_MESSAGE_POSITION:
      return state.set('toastMessagePosition', action.payload);

    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};
export default ToastMessageReducer;
