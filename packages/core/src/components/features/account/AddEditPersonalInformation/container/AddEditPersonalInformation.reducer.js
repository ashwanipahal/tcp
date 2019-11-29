import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../AddEditPersonalInformation.constants';

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
      if (action.meta.form === constants.ADD_PROFILE_INFORMATION_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === constants.ADD_PROFILE_INFORMATION_FORM) {
        checkErrorReset = false;
        return state.set('error', null);
      }
      return state;
    }
    default:
      return defaultStateReducer(state);
  }
};

const UpdateProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE_PROFILE_SUCCESS:
      return state.set('error', null).set('success', action.payload);
    case constants.UPDATE_PROFILE_ERROR:
      return state.set('error', fromJS(action.payload));
    default:
      return resetErrorReducer(state, action);
  }
};

export default UpdateProfileReducer;
