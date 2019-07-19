import { fromJS } from 'immutable';
import { getAddGiftCardResponse, getOnAddGiftCardPageState } from '../AddGiftCard.selector';

describe('#Add Gift Card selector', () => {
  const AddGiftCardState = fromJS({
    error: {},
    showUpdatedNotification: null,
    onAddGiftCardPage: false,
  });

  const state = {
    AddGiftCardReducer: AddGiftCardState,
  };

  it('#AddGiftCardState should return AddGiftCard state', () => {
    expect(getAddGiftCardResponse(state)).toEqual(AddGiftCardState.get('showUpdatedNotification'));
  });

  it('#AddGiftCardState should return AddGiftCard state', () => {
    expect(getOnAddGiftCardPageState(state)).toEqual(AddGiftCardState.get('onAddGiftCardPage'));
  });
});
