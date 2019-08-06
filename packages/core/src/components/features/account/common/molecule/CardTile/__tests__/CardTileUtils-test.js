import { getDataLocatorPrefix, getCardName } from '../views/CardTile.utils';

describe('CardTile utils', () => {
  it('should call getDataLocatorPrefix with default', () => {
    const card = {
      ccType: 'credit',
    };
    expect(getDataLocatorPrefix({ card })).toEqual('creditdebit');
  });
  it('should call getDataLocatorPrefix with gift card', () => {
    const card = {
      ccType: 'GiftCard',
    };
    expect(getDataLocatorPrefix({ card })).toEqual('giftcard');
  });
  it('should call getDataLocatorPrefix with venmo', () => {
    const card = {
      ccType: 'VENMO',
    };
    expect(getDataLocatorPrefix({ card })).toEqual('venmo');
  });
  it('should call getCardName with default', () => {
    const card = {
      ccType: 'credit',
    };
    const labels = {
      paymentGC: {
        lbl_payment_defaultCardName: 'Credit Card',
      },
      common: {},
    };
    expect(getCardName({ card, labels })).toEqual(labels.paymentGC.lbl_payment_defaultCardName);
  });
  it('should call getCardName with GiftCard', () => {
    const card = {
      ccType: 'GiftCard',
    };
    const labels = {
      paymentGC: {
        lbl_payment_giftCard: 'Gift Card Name',
      },
      common: {},
    };
    expect(getCardName({ card, labels })).toEqual(labels.paymentGC.lbl_payment_giftCard);
  });
  it('should call placecard with GiftCard', () => {
    const card = {
      ccType: 'PLACE CARD',
    };
    const labels = {
      paymentGC: {
        lbl_payment_plccCard: 'My Place Rewards Credit Card',
      },
      common: {},
    };
    expect(getCardName({ card, labels })).toEqual(labels.paymentGC.lbl_payment_plccCard);
  });
  it('should call venmo with GiftCard', () => {
    const card = {
      ccType: 'VENMO',
    };
    const labels = {
      paymentGC: {
        lbl_payment_venmoAccount: 'Your Venmo Account',
      },
      common: {},
    };
    expect(getCardName({ card, labels })).toEqual(labels.paymentGC.lbl_payment_venmoAccount);
  });
});
