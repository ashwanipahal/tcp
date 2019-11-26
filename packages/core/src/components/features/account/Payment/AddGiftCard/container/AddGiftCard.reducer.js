// @flow
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

type Action = {
  payload: {},
  type: string,
};

const returnAddGiftCardReducer = (state = initialState) => {
  if (state instanceof Object) {
    return fromJS(state);
  }
  return state;
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

    case SET_SUBMIT_SUCCEEDED: {
      if (action.meta.form === constants.ADD_GIFT_CARD_FORM) {
        checkErrorReset = true;
      }
      return state;
    }
    case CHANGE: {
      if (checkErrorReset && action.meta.form === constants.ADD_GIFT_CARD_FORM) {
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
      return returnAddGiftCardReducer(state);
  }
};

export default AddGiftCardReducer;
