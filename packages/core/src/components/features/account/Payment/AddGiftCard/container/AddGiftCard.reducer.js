// @flow
import { fromJS } from 'immutable';
import ADD_GIFT_CARD_CONSTANTS from '../AddGiftCard.constants';

const initialState = fromJS({
  addGiftCardResponse: {},
  error: {},
  showUpdatedNotification: null,
});

type Action = {
  payload: {},
  type: string,
};

const AddGiftCardReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_SUCCESS:
      return state.set('showUpdatedNotification', 'success');
    case ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_FAILED:
      return state.set('error', action.payload).set('showUpdatedNotification', 'error');
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddGiftCardReducer;
