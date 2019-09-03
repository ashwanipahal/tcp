import { fromJS } from 'immutable';
import GIFTCARD_SELECTORS from '../GiftCards.selectors';

describe('#Added to bag Selectors', () => {
  const GiftCardState = {
    checkout: {
      billing: { lbl_giftcard_title: 'Gift Cards' },
    },
  };
  const CartPageReducer = fromJS({
    orderDetails: {
      grandTotal: 0,
      giftCardsTotal: 0,
      orderItems: [],
      appliedGiftCards: [],
    },
  });

  const state = {
    Labels: GiftCardState,
    CartPageReducer,
  };

  it('#getGiftSectionLabels should return lables', () => {
    expect(GIFTCARD_SELECTORS.getGiftSectionLabels(state)).toEqual({
      giftCardTitle: 'Gift Cards',
    });
  });

  it('#getGrandTotal', () => {
    expect(GIFTCARD_SELECTORS.getGrandTotal(state)).toEqual(0);
  });

  it('#getGiftCardsTotal', () => {
    expect(GIFTCARD_SELECTORS.getGiftCardsTotal(state)).toEqual(0);
  });

  it('#getAppliedGiftCards', () => {
    expect(GIFTCARD_SELECTORS.getAppliedGiftCards(state)).toEqual(fromJS([]));
  });
});
