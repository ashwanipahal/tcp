export const getAddGiftCardResponse = state => {
  return state.AddGiftCardReducer.get('showUpdatedNotification');
};

export const getAddGiftCardError = state => {
  return state.AddGiftCardReducer.get('error');
};

export const getOnAddGiftCardPageState = state => {
  return state.AddGiftCardReducer.get('onAddGiftCardPage');
};
