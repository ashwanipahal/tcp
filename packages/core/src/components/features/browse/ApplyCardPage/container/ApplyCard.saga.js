import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../RewardsCard.constants';
import { setModuleX, obtainInstantCardApplication } from './ApplyCard.actions';
import { getModuleX } from '../../../../../services/abstractors/common/moduleXComposite';
import applyInstantCard from '../../../../../services/abstractors/common/PLCC';
import { validateReduxCache } from '../../../../../utils/cache.util';

/*
 * @Generator - fetchModuleX Saga -
 * @params - payload - array of contentIds
 *
 * @description - Helper Saga function to fetch the richtext data from module X.
 */

export function* fetchModuleX({ payload = '' }) {
  try {
    const result = yield call(getModuleX, payload);
    yield put(setModuleX(result));
  } catch (err) {
    yield null;
  }
}

/*
 * @Generator - submitCreditCardForm Saga -
 * @params - payload - form data for instant credit card form
 *
 * @description - Helper Saga function to submit the form.
 */

export function* submitCreditCardForm({ payload = '' }) {
  try {
    const res = yield call(applyInstantCard, payload);
    yield put(obtainInstantCardApplication(res));
  } catch (err) {
    yield null;
  }
}

/*
 * @Generator - ApplyCreditCardSaga Saga -
 *
 * @description - Primary saga to yield moduleX data.
 */

export function* ApplyCreditCardSaga() {
  const cachedfetchModuleX = validateReduxCache(fetchModuleX);
  yield takeLatest(constants.FETCH_MODULEX_CONTENT, cachedfetchModuleX);
}

/*
 * @Generator - SubmitInstantCardApplication Saga -
 *
 * @description - Primary saga to submit the instant credit card form.
 */

export function* SubmitInstantCardApplication() {
  const cachedsubmitCreditCardForm = validateReduxCache(submitCreditCardForm);
  yield takeLatest(constants.SEND_INSTANT_CARD_APPLICATION, cachedsubmitCreditCardForm);
}

export default ApplyCreditCardSaga;
