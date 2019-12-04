import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import FORGOTPASSWORD_CONSTANTS from '../ForgotPassword.constants';

const initialState = fromJS({
  showNotification: false,
  toggleSuccessfulEmailSection: null,
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
      if (action.meta.form === FORGOTPASSWORD_CONSTANTS.FORGOT_PASSWORD_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === FORGOTPASSWORD_CONSTANTS.FORGOT_PASSWORD_FORM) {
        checkErrorReset = false;
        return state.set('error', null).set('showNotification', false);
      }
      return state;
    }
    default:
      return defaultStateReducer(state);
  }
};

const ForgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_SUCCESS:
      return state.set('toggleSuccessfulEmailSection', true);
    case FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_FAIL:
      return state.set('showNotification', action.payload.state);
    case FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_LOGIN_STATE:
      return state
        .set('showNotification', false)
        .set('toggleSuccessfulEmailSection', null)
        .set('error', null);
    case FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_SUCCESSFULL_EMAIL:
      return state.set('toggleSuccessfulEmailSection', true);
    case FORGOTPASSWORD_CONSTANTS.USER_NOT_AVAILABLE:
      return state.set('error', fromJS(action.payload)).set('showNotification', true);
    default:
      return resetErrorReducer(state, action);
  }
};

export default ForgotPasswordReducer;
