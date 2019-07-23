import { call, takeLatest, put, select } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../utils/cache.util';
import PAYMENT_CONSTANTS from '../Payment.constants';
import fetchData from '../../../../../service/API';
import {
  setCardList,
  getCardListErr,
  showLoader,
  paymentAddGiftCardSuccess,
  setEspots,
} from './Payment.actions';
import { resetShowNotification } from '../AddGiftCard/container/AddGiftCard.actions';
import { getOnAddGiftCardPageState } from '../AddGiftCard/container/AddGiftCard.selector';
import endpoints from '../../../../../service/endpoint';

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

function* fetchEspot({ payload }) {
  // TODO:  move it to common ??
  // eslint-disable-next-line no-console
  try {
    const { baseURI, relURI, method } = endpoints.getEspots;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        espotname: payload,
        catalogId: 10551,
        langId: -1,
        storeId: 10151,
        devicetype: 'desktop',
        header: {
          espotName: payload,
          deviceType: 'desktop',
          type: 'content',
          'Cache-Control': 'no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
        },
      },
      method
    );
    const espotData = res.body.List[0].maketingText || [];
    yield put(setEspots(espotData));
  } catch (err) {
    const espotData = '';
    yield put(setEspots(espotData));
    // eslint-disable-next-line no-console
    console.log('Error in API');
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

export function* PaymentSaga() {
  const cachedCardList = validateReduxCache(getCardList);
  yield takeLatest(PAYMENT_CONSTANTS.GET_CARD_LIST, cachedCardList);
  yield takeLatest(PAYMENT_CONSTANTS.FETCH_ESPOT, fetchEspot);
}

export default PaymentSaga;
