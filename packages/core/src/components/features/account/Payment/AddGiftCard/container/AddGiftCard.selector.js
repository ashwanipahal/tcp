export const getAddGiftCardResponse = state => {
  return state.AddGiftCardReducer.get('showUpdatedNotification');
};

export const getOnAddGiftCardPageState = state => {
  return state.AddGiftCardReducer.get('onAddGiftCardPage');
};
