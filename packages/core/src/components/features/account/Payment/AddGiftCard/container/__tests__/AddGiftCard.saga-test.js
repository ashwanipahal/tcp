import { call, put, takeLatest } from 'redux-saga/effects';
import { addGiftCard, AddGiftCardSaga } from '../AddGiftCard.saga';
import endpoints from '../../../../../../../service/endpoint';
import { addGiftCardFailure } from '../AddGiftCard.actions';
import { getCardList } from '../../../container/Payment.actions';
import fetchData from '../../../../../../../service/API';
import ADD_GIFT_CARD_CONSTANTS from '../../AddGiftCard.constants';

describe('Add Gift Card saga', () => {
  let gen;
  const payload = {
    blahBlah: 'blah blah',
    fooFoo: 'foo foo',
  };

  beforeEach(() => {
    gen = addGiftCard({ payload });
  });

  it('should update default shipping address', () => {
    const res = {
      body: {
        addressId: '75066941',
        nickName: 'sb_2019-06-24 02:23:29.134',
      },
    };

    const { relURI, method } = endpoints.addGiftCard;
    const baseURI = endpoints.addGiftCard.baseURI || endpoints.global.baseURI;

    const langId = -1;
    const catalogId = 10551;
    const storeId = 10151;
    const isrest = true;

    expect(gen.next().value).toEqual(
      call(fetchData, baseURI, relURI, { payload, langId, catalogId, storeId, isrest }, method)
    );
    expect(gen.next(res).value).toEqual(put(getCardList({ ignoreCache: true })));
    expect(gen.next().done).toBeTruthy();
  });

  it('should fail default shipping address', () => {
    const err = {
      statusCode: 400,
      message: 'Object not found',
    };
    const { relURI, method } = endpoints.addGiftCard;
    const baseURI = endpoints.addGiftCard.baseURI || endpoints.global.baseURI;

    const langId = -1;
    const catalogId = 10551;
    const storeId = 10151;
    const isrest = true;

    expect(gen.next().value).toEqual(
      call(fetchData, baseURI, relURI, { payload, langId, catalogId, storeId, isrest }, method)
    );
    expect(gen.next(err).value).toEqual(put(addGiftCardFailure()));
    expect(gen.next().done).toBeTruthy();
  });

  it('should fail default shipping address', () => {
    const err = {
      statusCode: 400,
      message: 'Object not found',
    };
    gen.next();
    expect(gen.throw(err).value).toEqual(put(addGiftCardFailure(err)));
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
