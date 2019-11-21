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

  const Checkout = fromJS({
    values: {
      giftCardError: '',
      showAddGiftCard: false,
      addGiftCardError: '',
      addGiftCardResponse: '',
    },
  });

  const session = {
    siteDetails: {
      GIFT_CARD_RECAPTCHA_ENABLED: true,
    },
  };
  const state = {
    Labels: GiftCardState,
    CartPageReducer,
    Checkout,
    session,
  };

  it('#getGiftSectionLabels should return lables', () => {
    expect(GIFTCARD_SELECTORS.getGiftSectionLabels(state)).toEqual({
      lbl_giftcard_title: 'Gift Cards',
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

  it('#getGiftCardErrors', () => {
    expect(GIFTCARD_SELECTORS.getGiftCardErrors(state)).toEqual('');
  });

  it('#getShowAddGiftCard', () => {
    expect(GIFTCARD_SELECTORS.getShowAddGiftCard(state)).toEqual(false);
  });

  it('#getAddGiftCardErrors', () => {
    expect(GIFTCARD_SELECTORS.getAddGiftCardErrors(state)).toEqual('');
  });

  it('#getAddGiftCardResponse', () => {
    expect(GIFTCARD_SELECTORS.getAddGiftCardResponse(state)).toEqual('');
  });
  it('#getIsRecapchaEnabled', () => {
    expect(GIFTCARD_SELECTORS.getIsRecapchaEnabled(state)).toEqual(true);
  });
});
