import { call, takeLatest, put } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../utils/cache.util';
import PAYMENT_CONSTANTS from '../Payment.constants';
import fetchData from '../../../../../service/API';
import { setCardList, getCardListErr, setLoader } from './Payment.actions';
import endpoints from '../../../../../service/endpoint';

export function* getCardList() {
  try {
    const { relURI, method } = endpoints.getCardList;
    const baseURI = endpoints.getCardList.baseURI || endpoints.global.baseURI;
    yield put(setLoader());
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        isRest: true,
      },
      method
    );
    if (res.body) {
      return yield put(setCardList(res.body.creditCardListJson || []));
    }
    return yield put(getCardListErr(res.error));
  } catch (err) {
    return yield put(getCardListErr(err));
  }
}

export function* PaymentSaga() {
  const cachedCardList = validateReduxCache(getCardList);
  yield takeLatest(PAYMENT_CONSTANTS.GET_CARD_LIST, cachedCardList);
}

export default PaymentSaga;
