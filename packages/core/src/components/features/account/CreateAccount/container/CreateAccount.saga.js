import { takeLatest, call, put } from 'redux-saga/effects';
import CREATE_ACCOUNT_CONSTANTS from '../CreateAccount.constants';
import { getUserInfo } from '../../LoginPage/container/LoginPage.actions';
import { createAccountApi } from '../../../../../services/abstractors/account';

export function* createAccount({ payload }) {
  try {
    yield call(createAccountApi(payload));
    yield put(getUserInfo());
    yield null;
  } catch (err) {
    yield null;
  }
}

export function* CreateAccountSaga() {
  yield takeLatest(CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT, createAccount);
}

export default CreateAccountSaga;
