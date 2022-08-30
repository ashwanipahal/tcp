import { put, takeLatest } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../../utils/cache.util';
import { getCardList, PaymentSaga, fetchModuleX } from '../Payment.saga';
import { setCardList, getCardListErr, setModuleX } from '../Payment.actions';
import PAYMENT_CONSTANTS from '../../Payment.constants';

describe('CardList saga', () => {
  describe('getCardList', () => {
    let cardListGen;
    beforeEach(() => {
      cardListGen = getCardList();
      cardListGen.next();
      cardListGen.next();
    });

    it('should dispatch setcardList action for success resposnse', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      let putDescriptor = cardListGen.next(response).value;
      putDescriptor = cardListGen.next(response).value;
      expect(putDescriptor).toEqual(put(setCardList(response.body.contact)));
    });

    it('should not dispatch setCardList action if response is error', () => {
      const response = {
        error: 'Error in API',
      };
      let putDescriptor = cardListGen.next(response).value;
      putDescriptor = cardListGen.next(response).value;
      expect(putDescriptor).toEqual(put(getCardListErr(response.error)));
    });

    it('should not dispatch setCardList action for error', () => {
      const response = {
        error: 'Error in API',
      };
      const putDescriptor = cardListGen.throw(response).value;
      expect(putDescriptor).toEqual(put(getCardListErr(response)));
    });
  });

  describe('CardListSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = PaymentSaga();
      const takeLatestDescriptor = generator.next().value;
      const cachedMethod = validateReduxCache(getCardList);
      const expected = takeLatest(PAYMENT_CONSTANTS.GET_CARD_LIST, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});

describe('Module X Saga', () => {
  let moduleXGen;
  const payload = '66b73859-0893-4abe-9d0d-dc3d58fa2782';
  beforeEach(() => {
    moduleXGen = fetchModuleX({ payload });
  });
  describe('fetchmoduleX', () => {
    it('should dispatch setmoduleX action for success response', () => {
      const response = moduleXGen.next().value;
      expect(moduleXGen.next(response).value).toEqual(put(setModuleX(response)));
    });
  });
});
