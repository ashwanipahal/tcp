import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../ChangePassword.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

let checkErrorReset = false;

const returnChangePasswordReducer = (state = initialState) => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  if (typeof state === 'undefined') {
    return initialState;
  }
  return state;
};

const ChangePasswordReducer = (state, action) => {
  switch (action.type) {
    case constants.CHANGE_PASSWORD_SUCCESS:
      return state.set('error', null).set('success', action.payload);
    case constants.CHANGE_PASSWORD_ERROR:
      return state.set('error', fromJS(action.payload));
    case constants.CHANGE_PASSWORD_RESET:
      return state.set('error', null);
    case SET_SUBMIT_SUCCEEDED: {
      if (action.meta.form === constants.CHANGE_PASSWORD_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === constants.CHANGE_PASSWORD_FORM) {
        checkErrorReset = false;
        return state.set('error', null);
      }
      return state;
    }
    default:
      return returnChangePasswordReducer(state);
  }
};

export default ChangePasswordReducer;
