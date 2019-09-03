const getGiftSectionLabels = state => {
  const {
    checkout: {
      billing: {
        lbl_giftcard_title: giftCardTitle,
        lbl_giftcard_addUptoMsg: addUpToMsg,
        lbl_giftcard_appliedCards: appliedCardsTitle,
        lbl_giftcard_endingIn: endingIn,
        lbl_giftcard_remainingBal: remainingBalance,
        lbl_giftcard_removeBtn: remove,
        lbl_giftcard_headsUpTitle: headsUp,
        lbl_giftcard_headsUpMsg: headsUpMsg,
        lbl_giftcard_availableCards: availableGiftCards,
        lbl_giftcard_applyBtn: apply,
        lbl_giftcard_newGiftCard: newGiftCard,
        lbl_giftcard_commonError: commonError,
      },
    },
  } = state.Labels;
  return {
    giftCardTitle,
    addUpToMsg,
    appliedCardsTitle,
    endingIn,
    remainingBalance,
    remove,
    headsUp,
    headsUpMsg,
    availableGiftCards,
    apply,
    newGiftCard,
    commonError,
  };
};

const getGrandTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'grandTotal']) || 0;
};

const getAppliedGiftCards = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'appliedGiftCards']) || 0;
};

const getGiftCardsTotal = state => {
  return state.CartPageReducer.getIn(['orderDetails', 'giftCardsTotal']) || 0;
};

const getGiftCardErrors = state => {
  return state.Giftcards && state.Giftcards.get('giftCardError');
};

export default {
  getGrandTotal,
  getAppliedGiftCards,
  getGiftCardsTotal,
  getGiftSectionLabels,
  getGiftCardErrors,
};
