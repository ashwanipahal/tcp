import { takeLatest, call, put } from 'redux-saga/effects';
import CREATE_ACCOUNT_CONSTANTS from '../CreateAccount.constants';
import { getUserInfo } from '../../LoginPage/container/LoginPage.actions';
import { routerPush } from '../../../../../utils';
import { closeOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';
import { createAccountErr } from './CreateAccount.actions';
import { createAccountApi } from '../../../../../services/abstractors/account';

const errorMessage = res => {
  let errorMessageRecieved = '';
  errorMessageRecieved = res.body.errors[0].errorMessage;
  return errorMessageRecieved;
};

export function* createAccount({ payload }) {
  try {
    const res = yield call(createAccountApi, payload);
    /* istanbul ignore else */
    if (res.body) {
      if (res.body.errors) {
        const resErr = errorMessage(res);
        return yield put(createAccountErr(resErr));
      }
      yield put(getUserInfo());
      yield put(closeOverlayModal());
      return routerPush('/', '/home');
    }
    const resErr = errorMessage(res);
    return yield put(createAccountErr(resErr));
  } catch (err) {
    return yield put(createAccountErr(err));
  }
}

export function* CreateAccountSaga() {
  yield takeLatest(CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT, createAccount);
}

export default CreateAccountSaga;
