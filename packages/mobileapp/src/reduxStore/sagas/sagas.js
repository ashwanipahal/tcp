import { all } from 'redux-saga/effects';
import BootstrapSaga from '@tcp/core/src/reduxStore/sagas/bootstrap';
import LoginPageSaga from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.saga';
import HomePageSaga from '../../components/features/content/HomePage/container/HomePage.saga';

export default function* rootSaga() {
  yield all([BootstrapSaga(), HomePageSaga(), LoginPageSaga()]);
}
