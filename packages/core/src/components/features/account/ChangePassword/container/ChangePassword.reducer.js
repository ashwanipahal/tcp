import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../ChangePassword.constants';

const initialState = fromJS({
  success: null,
  error: null,
});

let checkErrorReset = false;

/**
 * @function defaultStateReducer used for return  default state reducer state
 * @param {state} state provide initial state to this function.
 * @return {state} return final state of the reducer.
 */

const defaultStateReducer = (state = initialState) => {
  // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
  if (state instanceof Object) {
    return fromJS(state);
  }
  if (typeof state === 'undefined') {
    return initialState;
  }
  return state;
};

/**
 * @function resetErrorReducer  Used to return Error state null when we change any form field .
 * @case SET_SUBMIT_SUCCEEDED used for set checkErrorReset is true when we got success form response after submit the form.
 * @case CHANGE used for reset value of checkErrorReset is false and set error to null.
 *  Using this error state we have hide form notification error.
 * @param {state} state provide initial state to this function.
 * @return {state} return final state of the reducer.
 */

const resetErrorReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return defaultStateReducer(state);
  }
};

const ChangePasswordReducer = (state, action) => {
  switch (action.type) {
    case constants.CHANGE_PASSWORD_SUCCESS:
      return state.set('error', null).set('success', action.payload);
    case constants.CHANGE_PASSWORD_ERROR:
      return state.set('error', fromJS(action.payload));
    case constants.CHANGE_PASSWORD_RESET:
      return state.set('error', null);
    default:
      return resetErrorReducer(state, action);
  }
};

export default ChangePasswordReducer;
