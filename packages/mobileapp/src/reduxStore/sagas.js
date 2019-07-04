import { all } from 'redux-saga/effects';

import plpSaga from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import HomePageSaga from '../components/features/content/HomePage/container/HomePage.saga';

export default function* rootSaga() {
  yield all([plpSaga(), HomePageSaga(), LoginPageSaga()]);
}
