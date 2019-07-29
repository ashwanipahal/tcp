import { call, takeLatest, put, select } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../utils/cache.util';
import PAYMENT_CONSTANTS from '../Payment.constants';
import fetchData from '../../../../../service/API';
import {
  setCardList,
  getCardListErr,
  showLoader,
  paymentAddGiftCardSuccess,
  setReferredContent,
  loadLabelsData,
} from './Payment.actions';
import { resetShowNotification } from '../AddGiftCard/container/AddGiftCard.actions';
import { getOnAddGiftCardPageState } from '../AddGiftCard/container/AddGiftCard.selector';
import endpoints from '../../../../../service/endpoint';
import {
  getReferredContentById,
  fetchLabels,
} from '../../../../../services/abstractors/common/ReferredContent';

export function* getCardList() {
  try {
    const { relURI, method } = endpoints.getCardList;
    const baseURI = endpoints.getCardList.baseURI || endpoints.global.baseURI;
    yield put(showLoader());
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
    const isFromAddGiftCard = yield select(getOnAddGiftCardPageState);
    if (res.body) {
      yield put(setCardList(res.body.creditCardListJson || []));
      if (isFromAddGiftCard) {
        // TODO Will Move into Add Gift Card Saga (Ajay Saini)
        yield put(paymentAddGiftCardSuccess());
        yield put(resetShowNotification());
      }
      return yield;
    }
    return yield put(getCardListErr(res.error));
  } catch (err) {
    return yield put(getCardListErr(err));
  }
}

function* fetchReferredContent({ payload = '' }) {
  try {
    const result = yield call(getReferredContentById, payload);
    yield put(setReferredContent(result));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
function* fetchPaymentLabels({ payload }) {
  try {
    const result = yield call(fetchLabels, payload);
    yield put(loadLabelsData(result));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

export function* PaymentSaga() {
  const cachedCardList = validateReduxCache(getCardList);
  yield takeLatest(PAYMENT_CONSTANTS.GET_CARD_LIST, cachedCardList);
  yield takeLatest(PAYMENT_CONSTANTS.FETCH_PAYMENT_LABELS, fetchPaymentLabels);
  yield takeLatest(PAYMENT_CONSTANTS.FETCH_REFERRED_CONTENT, fetchReferredContent);
}

export default PaymentSaga;
