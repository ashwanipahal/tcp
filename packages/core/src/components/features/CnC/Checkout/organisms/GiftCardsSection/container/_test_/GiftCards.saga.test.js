import { takeLatest, put, call } from 'redux-saga/effects';
import {
  GiftCardsSaga,
  applyGiftCard,
  removeGiftCardFromOrder,
  addGiftCardFromBilling,
} from '../GiftCards.saga';
import GIFTCARD_CONSTANTS from '../../GiftCards.constants';
import { getCartDataSaga } from '../../../../../BagPage/container/BagPage.saga';
import BAG_PAGE_ACTIONS from '../../../../../BagPage/container/BagPage.actions';

describe('GiftCards saga', () => {
  it('should return correct takeLatest effect', () => {
    const generator = GiftCardsSaga();
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GIFTCARD_CONSTANTS.APPLY_GIFT_CARD, applyGiftCard)
    );
    expect(generator.next().value).toEqual(
      takeLatest(GIFTCARD_CONSTANTS.REMOVE_GIFT_CARD, removeGiftCardFromOrder)
    );
    expect(generator.next().value).toEqual(
      takeLatest(GIFTCARD_CONSTANTS.ADD_GIFT_CARD, addGiftCardFromBilling)
    );
  });

  describe('applyGiftCard saga', () => {
    const payloadData = { payload: {} };
    const applyGiftCardGen = applyGiftCard(payloadData);
    it('should dispatch getCartData ', () => {
      const response = {};
      applyGiftCardGen.next();
      applyGiftCardGen.next();
      applyGiftCardGen.next();
      applyGiftCardGen.next();
      expect(applyGiftCardGen.next(response).value).toEqual(
        call(getCartDataSaga, {
          isRecalculateTaxes: true,
          excludeCartItems: false,
          recalcRewards: true,
          isCheckoutFlow: true,
          translation: false,
        })
      );
    });
  });
});
