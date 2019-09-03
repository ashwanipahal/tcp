import { fromJS } from 'immutable';
import GIFTCARD_CONSTANTS from '../../GiftCards.constants';
import GiftCardsReducer from '../GiftCards.reducer';

describe('GiftCard Reducer', () => {
  const initialState = {
    giftCardError: null,
  };
  const initialStateMutated = fromJS(initialState);

  const setGiftCardsError = {
    type: GIFTCARD_CONSTANTS.SET_GIFTCARD_ERROR,
    payload: {
      9111: 'Error Message',
    },
  };

  const reserGiftCardsError = {
    type: GIFTCARD_CONSTANTS.RESET_GIFTCARD_ERROR,
  };

  it('SET_GIFTCARD_ERROR', () => {
    const newState = GiftCardsReducer(initialStateMutated, {
      ...setGiftCardsError,
    });

    expect(newState.get('giftCardError').length).toEqual(setGiftCardsError.payload.length);
  });

  it('RESET_GIFTCARD_ERROR', () => {
    const newState = GiftCardsReducer(initialStateMutated, {
      ...reserGiftCardsError,
    });
    expect(newState.get('giftCardError')).toEqual(null);
  });
});
