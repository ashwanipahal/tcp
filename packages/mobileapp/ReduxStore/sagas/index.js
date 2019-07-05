import { all } from 'redux-saga/effects';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import plpSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import homePageSaga from '../homePage/homePage.saga';

export default function* rootSaga() {
  yield all([BootstrapSaga(), homePageSaga(), plpSaga(), LoginPageSaga()]);
}
