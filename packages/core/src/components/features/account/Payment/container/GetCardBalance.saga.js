import { call, takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../Payment.constants';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';
import { setcheckBalance } from './Payment.actions';

export function* getGiftCardBalance({ payload }) {
  const { relURI, method } = endpoints.getGifCardBalance;
  const baseURI = endpoints.deleteAddress.baseURI || endpoints.global.baseURI;
  const payloadParam = {
    'recapture-response': payload.formData.recaptchaToken || '',
    creditCardId: payload.card.creditCardId.toString(),
  };

  const res = yield call(
    fetchData,
    baseURI,
    relURI,
    {
      payload: payloadParam,
      langId: -1,
      catalogId: 10551,
      storeId: 10151,
    },
    method
  );
  if (res.statusCode === 200) {
    yield put(setcheckBalance(res.body || ''));
  }
}

export function* GiftCardBalanceSaga() {
  yield takeLatest(PAYMENT_CONSTANTS.CHECK_BALANCE, getGiftCardBalance);
}

export default GiftCardBalanceSaga;
