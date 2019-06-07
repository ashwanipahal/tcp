import { call, put, takeLatest } from 'redux-saga/effects';
import fetchData from '@tcp/core/src/service/API';
import { endpoints } from '@tcp/core/src/service/endpoint';
import { HOMEPAGE_CONSTANTS } from '../HomePage.constants';
import { setHeaderlinks } from './HomePage.actions';

function* fetchTaxonomy() {
  try {
    const { baseURI, relURI, method } = endpoints.getTaxonomy;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        storeId: 10151,
        catalogId: 10551,
      },
      method
    );
    const payload = yield res.body.taxonomy[0].children;
    yield put(setHeaderlinks(payload));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error in fetchTaxonomy API');
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* HomePageSaga() {
  yield takeLatest(HOMEPAGE_CONSTANTS.FETCH_HEADER_LINKS, fetchTaxonomy);
}

export default HomePageSaga;
