// @flow
import { fromJS } from 'immutable';
import ADD_GIFT_CARD_CONSTANTS from '../AddGiftCard.constants';

const initialState = fromJS({
  error: {},
  showUpdatedNotification: null,
  onAddGiftCardPage: false,
});

type Action = {
  payload: {},
  type: string,
};

const AddGiftCardReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_REQUEST:
      return state.set('onAddGiftCardPage', true);
    case ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_SUCCESS:
      return state.set('showUpdatedNotification', 'success');
    case ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_FAILED:
      return state
        .set('error', action.payload)
        .set('showUpdatedNotification', 'error')
        .set('onAddGiftCardPage', false);
    case ADD_GIFT_CARD_CONSTANTS.RESET_SHOW_NOTIFICATION:
      return state.set('showUpdatedNotification', null).set('onAddGiftCardPage', false);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddGiftCardReducer;
