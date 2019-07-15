import { call, takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../Payment.constants';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';
import { setcheckBalance, setcheckBalanceError } from './Payment.actions';

export function* getGiftCardBalance({ payload }) {
  try {
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
      return yield put(setcheckBalance(res.body || ''));
    }
    return yield put(setcheckBalanceError());
  } catch (err) {
    return yield put(setcheckBalanceError(err));
  }
}

export function* GiftCardBalanceSaga() {
  yield takeLatest(PAYMENT_CONSTANTS.CHECK_BALANCE, getGiftCardBalance);
}

export default GiftCardBalanceSaga;
