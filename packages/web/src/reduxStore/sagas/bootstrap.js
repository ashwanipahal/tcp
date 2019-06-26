import { call, put, takeLatest } from 'redux-saga/effects';
import bootstrapAbstractor from '@tcp/core/src/services/abstractors/bootstrap';
import { loadLayoutData, loadLabelsData } from '../actions';
import { loadHeaderData } from '../../components/common/organisms/Header/container/Header.actions';
import { loadFooterData } from '../../components/common/organisms/Footer/container/Footer.actions';
import GLOBAL_CONSTANTS from '../constants';

function* bootstrap({ pageInfo = { name: 'homepage' } }) {
  const pagesList = [pageInfo.name];
  try {
    const result = yield call(bootstrapAbstractor, pagesList);
    yield put(loadLayoutData(result[pageInfo.name], pageInfo.name));
    yield put(loadLabelsData(result.labels));
    yield put(loadHeaderData(result.header));
    yield put(loadFooterData(result.footer));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* BootstrapSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.BOOTSTRAP_API, bootstrap);
}

export default BootstrapSaga;
