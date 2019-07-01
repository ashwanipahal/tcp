import { all } from 'redux-saga/effects';

import plpSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import homePageSaga from '../ReduxStore/homePage/homePage.saga';

export default function* rootSaga() {
  yield all([plpSaga(), homePageSaga(), LoginPageSaga()]);
}
