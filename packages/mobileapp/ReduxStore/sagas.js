import { all } from 'redux-saga/effects';
import plpSaga from '@tcp/core/components/plpPage/plp.saga';
import homePageSaga from "../ReduxStore/homePage/homePage.saga";

export default function* rootSaga() {
  yield all([
    plpSaga(),
    homePageSaga()
]);
}