import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import endpoints from '@tcp/core/src/service/endpoint';
import fetchData from '@tcp/core/src/service/API';
import { HOMEPAGE_CONSTANTS } from '../HomePage.constants';
import { setHeaderlinks, setEspots } from './HomePage.actions';

// TODO: Move it to _APP.js SAGA
function* fetchTaxonomy() {
  logger.info('fetchTaxonomy');
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
    logger.error('Error in API');
    logger.error(err);
  }
}

function* fetchEspot({ payload }) {
  // TODO:  move it to common ??
  logger.info('fetchEspot');
  try {
    const { baseURI, relURI, method } = endpoints.getEspots;

    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        espotname: payload,
        catalogId: 10551,
        langId: -1,
        storeId: 10151,
        devicetype: 'desktop',
        header: {
          espotName: payload,
          deviceType: 'desktop',
          type: 'content',
          'Cache-Control': 'no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
        },
      },
      method
    );
    const espotData = res.body.List || [];
    yield put(setEspots(espotData));
  } catch (err) {
    logger.error('Error in API');
    logger.error(err);
  }
}

function* HomePageSaga() {
  yield takeLatest(HOMEPAGE_CONSTANTS.FETCH_HEADER_LINKS, fetchTaxonomy);
  yield takeLatest(HOMEPAGE_CONSTANTS.FETCH_ESPOT, fetchEspot);
}

export default HomePageSaga;
