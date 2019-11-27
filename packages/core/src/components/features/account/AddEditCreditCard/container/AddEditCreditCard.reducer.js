import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from './AddEditCreditCard.constants';

const initialState = fromJS({
  showNotification: false,
  error: null,
});

let checkErrorReset = false;

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
      if (action.meta.form === constants.FORM_NAME) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === constants.FORM_NAME) {
        checkErrorReset = false;
        return state.set('error', null).set('showNotification', false);
      }
      return state;
    }
    default:
      return defaultStateReducer(state);
  }
};

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

const AddEditCreditCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_CREDIT_CARD:
    case constants.EDIT_CREDIT_CARD:
      return initialState;
    case constants.ADD_CREDIT_CARD_SUCCESS:
      // return fromJS(action.payload);
      return state.set('success', fromJS(action.payload)).set('error', null);
    case constants.ADD_CREDIT_CARD_ERROR:
      return state
        .set('error', fromJS(action.payload))
        .set('showNotification', true)
        .set('success', null);
    case constants.ADD_CREDIT_CARD_RESET_SUCCESS:
      return state.set('success', null).set('showNotification', false);
    case constants.ADD_CREDIT_CARD_RESET_ERROR:
      return state.set('error', null).set('showNotification', false);
    default:
      return resetErrorReducer(state, action);
  }
};

export default AddEditCreditCardReducer;
