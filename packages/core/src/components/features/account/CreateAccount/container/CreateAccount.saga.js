import { takeLatest, call, put } from 'redux-saga/effects';
import CREATE_ACCOUNT_CONSTANTS from '../CreateAccount.constants';
import fetchData from '../../../../../service/API';
import { getUserInfo } from '../../LoginPage/container/LoginPage.actions';
import endpoints from '../../../../../service/endpoint';
import { routerPush } from '../../../../../utils/utils';
import { closeOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';

export function* createAccount({ payload }) {
  try {
    const { relURI, method } = endpoints.createAccount;
    const baseURI = endpoints.getCardList.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        payload: {
          catalogId: '10551',
          firstName: payload.firstName,
          langId: '-1',
          lastName: payload.lastName,
          logonId: payload.emailAddress,
          logonPassword: payload.password,
          phone1: payload.phoneNumber,
          rememberCheck: payload.rememberMe || false,
          rememberMe: payload.rememberMe || false,
          response: 'no_response::false:false',
          storeId: '10151',
          userId: '-1002',
          xCreditCardId: '',
          zipCode: payload.noCountryZip,
        },
      },
      method
    );
    /* istanbul ignore else */
    if (res.body) {
      yield put(getUserInfo());
      yield put(closeOverlayModal());
      routerPush('/', '/home');
    }
  } catch (err) {
    yield null;
  }
}

export function* CreateAccountSaga() {
  yield takeLatest(CREATE_ACCOUNT_CONSTANTS.CREATE_AN_ACCOUNT, createAccount);
}

export default CreateAccountSaga;
