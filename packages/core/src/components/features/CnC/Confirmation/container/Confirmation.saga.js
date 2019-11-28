import { call, takeLatest, put, select } from 'redux-saga/effects';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';

import {
  setUpdateOrderDetailsData,
  setLoadingState,
  smsNotificationErr,
  setSmsNotificationSuccess,
} from './Confirmation.actions';
import { subscribeSmsNotification } from '../../../../../services/abstractors/CnC/index';
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';

export function* fetchModuleX({ payload = '' }) {
  try {
    const result = yield call(getModuleX, payload);
    yield put(setUpdateOrderDetailsData(result));
  } catch (err) {
    yield null;
  }
}

const getErrorMessage = res => {
  let errorMessageRecieved = '';
  errorMessageRecieved = res && res.body && res.body.errors && res.body.errors[0].errorMessage;
  return {
    errorMessage: errorMessageRecieved,
  };
};

export function* createSMSNotification({ payload }) {
  yield put(setLoaderState(true));
  yield put(setLoadingState({ isLoading: true }));
  try {
    const errorMappings = yield select(BagPageSelectors.getErrorMapping);
    const res = yield call(subscribeSmsNotification, { ...payload }, errorMappings);
    yield put(setLoadingState({ isLoading: false }));

    if (res.body && res.body.errors) {
      const resErr = getErrorMessage(res);
      return yield put(smsNotificationErr(resErr));
    }
    yield put(setLoaderState(false));
    return yield put(setSmsNotificationSuccess(true));
  } catch (err) {
    yield put(setLoaderState(false));
    yield put(setLoadingState({ isLoading: false }));
    return yield put(smsNotificationErr(err));
  }
}

export function* ConfirmationPageSaga() {
  yield takeLatest(CONFIRMATION_CONSTANTS.CONFIRMATION_FETCH_UPDATE_ORDER_DETAILS, fetchModuleX);
  yield takeLatest(CONFIRMATION_CONSTANTS.CONFIRMATION_SMS_NOTIFICATION, createSMSNotification);
}

export default ConfirmationPageSaga;
