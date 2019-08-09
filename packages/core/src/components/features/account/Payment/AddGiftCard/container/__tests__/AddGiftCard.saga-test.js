import { call, put, takeLatest } from 'redux-saga/effects';
import { addGiftCard, AddGiftCardSaga } from '../AddGiftCard.saga';
import { addGiftCardFailure, addGiftCardSuccess } from '../AddGiftCard.actions';
import { clearCardListTTL } from '../../../container/Payment.actions';
import ADD_GIFT_CARD_CONSTANTS from '../../AddGiftCard.constants';
import { addGiftCardApi } from '../../../../../../../services/abstractors/account';

describe('Add Gift Card saga', () => {
  let gen;
  const payload = {
    account_pin: undefined,
    cc_brand: 'GC',
    payMethodId: 'GiftCard',
    pay_account: undefined,
    recapchaResponse: undefined,
  };

  beforeEach(() => {
    gen = addGiftCard({ payload });
  });

  it('should add gift card address', () => {
    const res = {
      body: {
        id: '75066941',
      },
    };

    expect(gen.next().value).toEqual(call(addGiftCardApi, payload));
    expect(gen.next(res).value).toEqual(put(clearCardListTTL()));
    expect(gen.next(res).value).toEqual(put(addGiftCardSuccess()));
    expect(gen.next().done).toBeTruthy();
  });

  it('should fail add gift card', () => {
    const err = {
      statusCode: 400,
      message: 'Object not found',
    };

    expect(gen.next().value).toEqual(call(addGiftCardApi, payload));
    expect(gen.next(err).value).toEqual(put(addGiftCardFailure()));
    expect(gen.next().done).toBeTruthy();
  });

  it('should test addGiftCard', () => {
    gen = AddGiftCardSaga();
    expect(gen.next().value).toEqual(
      takeLatest(ADD_GIFT_CARD_CONSTANTS.ADD_GIFT_CARD_REQUEST, addGiftCard)
    );
    expect(gen.next().done).toBeTruthy();
  });
});
