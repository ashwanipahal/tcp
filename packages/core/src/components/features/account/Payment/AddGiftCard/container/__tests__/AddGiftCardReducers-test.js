import { fromJS } from 'immutable';
import AddGiftCardReducer from '../AddGiftCard.reducer';
import ADD_GIFT_CARD_CONSTANTS from '../../AddGiftCard.constants';

describe('AddGiftCard Reducer', () => {
  const initialState = fromJS({
    error: {},
    showUpdatedNotification: null,
    onAddGiftCardPage: false,
  });

  it('should return empty add gift card as default state', () => {
    expect(AddGiftCardReducer(undefined, {}).get('showUpdatedNotification')).toBeNull();
  });

  it('should be called on add gift card request', () => {
    expect(
      AddGiftCardReducer(initialState, {
        type: ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_REQUEST,
      })
    ).toEqual(fromJS({ onAddGiftCardPage: true, error: {}, showUpdatedNotification: null }));
  });

  it('should be called on add gift card success', () => {
    expect(
      AddGiftCardReducer(initialState, {
        type: ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_SUCCESS,
      })
    ).toEqual(fromJS({ showUpdatedNotification: 'success', onAddGiftCardPage: false, error: {} }));
  });

  it('should be called on add gift card failed', () => {
    const err = fromJS({
      statusCode: 400,
      message: 'Object not found inn res',
    });
    expect(
      AddGiftCardReducer(initialState, {
        type: ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_FAILED,
        payload: err,
      })
    ).toEqual(fromJS({ error: err, showUpdatedNotification: 'error', onAddGiftCardPage: false }));
  });

  it('should be called on reset show Notification', () => {
    expect(
      AddGiftCardReducer(initialState, {
        type: ADD_GIFT_CARD_CONSTANTS.RESET_SHOW_NOTIFICATION,
      })
    ).toEqual(fromJS({ showUpdatedNotification: null, error: {}, onAddGiftCardPage: false }));
  });
});
