import { fromJS } from 'immutable';
import AddGiftCardReducer from '../AddGiftCard.reducer';
import ADD_GIFT_CARD_CONSTANTS from '../../AddGiftCard.constants';

describe('AddGiftCard Reducer', () => {
  const initialState = fromJS({
    error: null,
    showUpdatedNotification: null,
    onAddGiftCardPage: false,
    showNotification: false,
  });

  it('should return empty add gift card as default state', () => {
    expect(AddGiftCardReducer(undefined, {}).get('showUpdatedNotification')).toBeNull();
  });

  it('should be called on add gift card request', () => {
    expect(
      AddGiftCardReducer(initialState, {
        type: ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_REQUEST,
      })
    ).toEqual(
      fromJS({
        showNotification: false,
        onAddGiftCardPage: true,
        error: null,
        showUpdatedNotification: null,
      })
    );
  });

  it('should be called on add gift card success', () => {
    expect(
      AddGiftCardReducer(initialState, {
        type: ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_SUCCESS,
      })
    ).toEqual(
      fromJS({
        showNotification: false,
        showUpdatedNotification: 'success',
        onAddGiftCardPage: false,
        error: null,
      })
    );
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
    ).toEqual(
      fromJS({
        error: err,
        showUpdatedNotification: 'error',
        onAddGiftCardPage: false,
        showNotification: true,
      })
    );
  });

  it('should be called on reset show Notification', () => {
    expect(
      AddGiftCardReducer(initialState, {
        type: ADD_GIFT_CARD_CONSTANTS.RESET_SHOW_NOTIFICATION,
      })
    ).toEqual(
      fromJS({
        showNotification: false,
        showUpdatedNotification: null,
        error: null,
        onAddGiftCardPage: false,
      })
    );
  });
});
