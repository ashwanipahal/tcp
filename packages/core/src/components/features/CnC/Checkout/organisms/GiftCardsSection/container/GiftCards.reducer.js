import { fromJS } from 'immutable';
import GIFTCARD_CONSTANTS from '../GiftCards.constants';

const initialState = fromJS({
  giftCardError: null,
});

const GiftCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GIFTCARD_CONSTANTS.SET_GIFTCARD_ERROR:
      return state.set('giftCardError', action.payload);
    case GIFTCARD_CONSTANTS.RESET_GIFTCARD_ERROR:
      return state.set('giftCardError', null);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default GiftCardsReducer;
