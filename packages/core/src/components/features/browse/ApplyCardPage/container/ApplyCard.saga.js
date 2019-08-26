import { call, takeLatest, put } from 'redux-saga/effects';
import constants from '../RewardsCard.constants';
import { setModuleX, obtainInstantCardApplication } from './ApplyCard.actions';
import { getModuleX } from '../../../../../services/abstractors/common/moduleXComposite';
import { applyInstantCard } from '../../../../../services/abstractors/account/ApplyInstantCard';

/*
 * @Generator - fetchModuleX Saga -
 * @params - payload - array of contentIds
 *
 * @description - Helper Saga function to fetch the richtext data from module X.
 */

export function* fetchModuleX({ payload = '' }) {
  try {
    const plccContent = {};
    const result = yield call(getModuleX, payload);
    payload.map(item => {
      plccContent[item.name] =
        result.data[item.name] &&
        result.data[item.name].composites &&
        result.data[item.name].composites.richTextList[0].text;
      return true;
    });
    yield put(setModuleX(plccContent));
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
  yield takeLatest(constants.FETCH_MODULEX_CONTENT, fetchModuleX);
}

/*
 * @Generator - SubmitInstantCardApplication Saga -
 *
 * @description - Primary saga to submit the instant credit card form.
 */

export function* SubmitInstantCardApplication() {
  yield takeLatest(constants.SEND_INSTANT_CARD_APPLICATION, submitCreditCardForm);
}

export default ApplyCreditCardSaga;
