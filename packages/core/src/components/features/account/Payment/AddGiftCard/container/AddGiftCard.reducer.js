
import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import ADD_GIFT_CARD_CONSTANTS from '../AddGiftCard.constants';

// TODO - Refactor reducer state (Ajay Saini)
const initialState = fromJS({
  error: null,
  showUpdatedNotification: null,
  onAddGiftCardPage: false,
  showNotification: false,
});
let checkErrorReset = false;

// @flow
type Action = {
  payload: {},
  type: string,
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
      if (action.meta.form === ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_FORM) {
        checkErrorReset = false;
        return state
          .set('showNotification', false)
          .set('showUpdatedNotification', null)
          .set('onAddGiftCardPage', false)
          .set('error', null);
      }
      return state;
    }
    default:
      return defaultStateReducer(state);
  }
};

const AddGiftCardReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_REQUEST:
      return state.set('onAddGiftCardPage', true);
    case ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_SUCCESS:
      return state.set('showUpdatedNotification', 'success');
    case ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_FAILED:
      return state
        .set('error', fromJS(action.payload))
        .set('showNotification', true)
        .set('showUpdatedNotification', 'error')
        .set('onAddGiftCardPage', false);
    case ADD_GIFT_CARD_CONSTANTS.RESET_SHOW_NOTIFICATION:
      return state
        .set('showNotification', false)
        .set('showUpdatedNotification', null)
        .set('onAddGiftCardPage', false)
        .set('error', null);
    default:
      return resetErrorReducer(state, action);
  }
};

export default AddGiftCardReducer;
