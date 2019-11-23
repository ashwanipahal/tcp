import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import { setClickAnalyticsData, trackClick } from '@tcp/core/src/analytics/actions';
import CREATE_ACCOUNT_CONSTANTS from '../CreateAccount.constants';
import { getUserInfo } from '../../User/container/User.actions';
import { navigateXHRAction } from '../../NavigateXHR/container/NavigateXHR.action';
import { createAccountErr, setLoadingState } from './CreateAccount.actions';
import { createAccountApi } from '../../../../../services/abstractors/account';
import { setCreateAccountSuccess } from '../../../CnC/Confirmation/container/Confirmation.actions';
import CONFIRMATION_CONSTANTS from '../../../CnC/Confirmation/Confirmation.constants';
import briteVerifyStatusExtraction from '../../../../../services/abstractors/common/briteVerifyStatusExtraction';

const getErrorMessage = res => {
  let errorMessageRecieved = '';
  errorMessageRecieved = res && res.body && res.body.errors && res.body.errors[0].errorMessage;
  return {
    errorMessage: errorMessageRecieved,
  };
};

export function* createsaga({ payload }) {
  yield put(setLoaderState(true));
  yield put(setLoadingState({ isLoading: true }));
  try {
    const { emailAddress } = payload;
    const emailValidationStatus = yield call(briteVerifyStatusExtraction, emailAddress);

    const res = yield call(createAccountApi, { ...payload, emailValidationStatus });
    yield put(setLoadingState({ isLoading: false }));
    yield put(
      setClickAnalyticsData({
        eventName: 'create account',
        pageNavigationText: 'header-create account',
      })
    );
    yield put(trackClick('register_submit'));
    /* istanbul ignore else */
    if (res.body) {
      if (res.body.errors) {
        const resErr = getErrorMessage(res);
        return yield put(createAccountErr(resErr));
      }
      if (payload.isOrderConfirmation) {
        yield put(setCreateAccountSuccess(true));
        yield delay(CONFIRMATION_CONSTANTS.SUCCESS_MESSAGE_TIME_MS);
        yield put(setCreateAccountSuccess(false));
      }
      yield put(navigateXHRAction());
      return yield put(getUserInfo());
    }
    const resErr = getErrorMessage(res);
    yield put(setLoaderState(false));
    return yield put(createAccountErr(resErr));
  } catch (err) {
    const { errorCode, errorMessage } = err;
    yield put(setLoaderState(false));
    yield put(setLoadingState({ isLoading: false }));
    return yield put(
      createAccountErr({
        errorCode,
        errorMessage,
      })
    );
  }
}

export function* CreateAccountSaga() {
  yield takeLatest(CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT, createsaga);
}

export default CreateAccountSaga;
