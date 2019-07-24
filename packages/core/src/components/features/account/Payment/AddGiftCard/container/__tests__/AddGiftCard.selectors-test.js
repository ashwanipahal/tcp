import { fromJS } from 'immutable';
import {
  getAddGiftCardResponse,
  getOnAddGiftCardPageState,
  getAddGiftCardError,
} from '../AddGiftCard.selector';

describe('#Add Gift Card selector', () => {
  const AddGiftCardState = fromJS({
    error: null,
    showUpdatedNotification: null,
    onAddGiftCardPage: false,
  });

  const state = {
    AddGiftCardReducer: AddGiftCardState,
  };

  it('#AddGiftCardState should return AddGiftCard  state', () => {
    expect(getAddGiftCardResponse(state)).toEqual(AddGiftCardState.get('showUpdatedNotification'));
  });

  it('#AddGiftCardState should return AddGiftCard state', () => {
    expect(getOnAddGiftCardPageState(state)).toEqual(AddGiftCardState.get('onAddGiftCardPage'));
  });

  it('#AddGiftCardState should return AddGiftCard error state', () => {
    expect(getAddGiftCardError(state)).toEqual(AddGiftCardState.get('error'));
  });
});
