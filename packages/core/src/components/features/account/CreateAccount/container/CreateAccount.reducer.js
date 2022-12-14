import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../CreateAccount.constants';

const initialState = fromJS({
  error: null,
  isLoading: false,
});
let checkErrorReset = false;

/**
 * @function defaultStateReducer used for return  default state reducer state
 * @param {state} state provide initial state to this function.
 * @return {state} return final state of the reducer.
 */

const defaultStateReducer = (state = initialState) => {
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
      if (action.meta.form === constants.CREATE_ACCOUNT_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === constants.CREATE_ACCOUNT_FORM) {
        checkErrorReset = false;
        return state.set('error', null);
      }
      return state;
    }
    default:
      return defaultStateReducer(state);
  }
};

const CreateAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_LOADING_STATE:
      return state.set('isLoading', action.payload.isLoading);
    case constants.CREATE_AN_ACCOUNT:
      return state.set('error', null);
    case constants.CREATE_AN_ACCOUNT_ERR:
      return state.set('error', fromJS(action.payload));
    case constants.RESET_CREATE_AN_ACCOUNT_ERR:
      return state.set('error', null);
    default:
      return resetErrorReducer(state, action);
  }
};

export default CreateAccountReducer;
