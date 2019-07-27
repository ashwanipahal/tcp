import { call, put, takeLatest } from 'redux-saga/effects';
import bootstrapAbstractor from '../../services/abstractors/bootstrap';
import { loadLayoutData, loadLabelsData, loadModulesData } from '../actions';
import { loadHeaderData } from '../../components/features/content/Header/container/Header.actions';
import { loadFooterData } from '../../components/features/content/Footer/container/Footer.actions';
import { loadNavigationData } from '../../components/features/content/Navigation/container/Navigation.actions';
import GLOBAL_CONSTANTS from '../constants';

function* bootstrap({ pageInfo = { name: 'homepage' } }) {
  const pagesList = [pageInfo.name];
  try {
    const result = yield call(bootstrapAbstractor, pagesList);
    yield put(loadLayoutData(result[pageInfo.name].items[0].layout, pageInfo.name));
    yield put(loadLabelsData(result.labels));
    yield put(loadHeaderData(result.header));
    yield put(loadNavigationData(result.navigation));
    yield put(loadFooterData(result.footer));
    yield put(loadModulesData(result.modules));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* BootstrapSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.BOOTSTRAP_API, bootstrap);
}

export default BootstrapSaga;
