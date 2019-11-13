import { call, takeLatest, put, select } from 'redux-saga/effects';
import CheckoutSelectors from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import constants, { ERR_CONFIG } from '../RewardsCard.constants';
import { setModuleX, obtainInstantCardApplication } from './ApplyCard.actions';
import {
  setPlccCardIdActn,
  setPlccCardNumberActn,
  getUserInfo,
} from '../../../account/User/container/User.actions';
import { isGuest } from '../../../CnC/Checkout/container/Checkout.selector';
import { getAddressList } from '../../../account/AddressBook/container/AddressBook.actions';
import { getCardList } from '../../../account/Payment/container/Payment.saga';
import { getModuleX } from '../../../../../services/abstractors/common/moduleXComposite';
import applyInstantCard from '../../../../../services/abstractors/common/PLCC';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { getErrorMapping, getRtpsPreScreenData } from './ApplyCard.selectors';
import { toastMessageInfo } from '../../../../common/atoms/Toast/container/Toast.actions.native';
import { isMobileApp } from '../../../../../utils';
import BAG_PAGE_ACTIONS from '../../../CnC/BagPage/container/BagPage.actions';

const { getCurrentCheckoutStage, getIsRtpsFlow } = CheckoutSelectors;

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
    const labels = yield select(getErrorMapping);
    const { preScreenCode } = yield select(getRtpsPreScreenData);
    const isRTPSFlow = yield select(getIsRtpsFlow);
    const currentCheckoutStage = yield select(getCurrentCheckoutStage);
    const res = yield call(
      applyInstantCard,
      payload,
      labels,
      preScreenCode,
      currentCheckoutStage === 'review',
      isRTPSFlow
    );
    // Check for mobile App and to showcase the toast message of results.
    if (isMobileApp() && ERR_CONFIG.indexOf(res.status) === -1) {
      yield put(toastMessageInfo(res.status));
    }
    yield put(obtainInstantCardApplication(res));
    yield put(setPlccCardIdActn(res.onFileCardId || res.xCardId));
    yield put(setPlccCardNumberActn((res.cardNumber || '').substr(-4)));
    if (isRTPSFlow) {
      if (!isGuest) {
        yield put(getAddressList({ ignoreCache: true }));
        yield put(getCardList({ ignoreCache: true }));
      }
      yield put(getUserInfo({ ignoreCache: true }));
      yield put(
        BAG_PAGE_ACTIONS.getCartData({
          isRecalculateTaxes: false,
          excludeCartItems: false,
          recalcRewards: false,
          isCheckoutFlow: true,
          updateSmsInfo: false,
          translation: true,
        })
      );
    }
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
