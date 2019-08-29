import { takeLatest, call, put } from 'redux-saga/effects';
import CREATE_ACCOUNT_CONSTANTS from '../CreateAccount.constants';
import { getUserInfo } from '../../User/container/User.actions';
import { createAccountErr } from './CreateAccount.actions';
import { createAccountApi } from '../../../../../services/abstractors/account';

const getErrorMessage = res => {
  let errorMessageRecieved = '';
  errorMessageRecieved = res && res.body && res.body.errors && res.body.errors[0].errorMessage;
  return {
    errorMessage: errorMessageRecieved,
  };
};

export function* createsaga({ payload }) {
  try {
    const res = yield call(createAccountApi, payload);
    /* istanbul ignore else */
    if (res.body) {
      if (res.body.errors) {
        const resErr = getErrorMessage(res);
        return yield put(createAccountErr(resErr));
      }
      return yield put(getUserInfo());
    }
    const resErr = getErrorMessage(res);
    return yield put(createAccountErr(resErr));
  } catch (err) {
    const { errorCode, errorMessage } = err;
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
