import { call, put, putResolve, takeLatest } from 'redux-saga/effects';
import bootstrapAbstractor from '../../services/abstractors/bootstrap';
import xappAbstractor from '../../services/abstractors/bootstrap/xappConfig';
import {
  loadLayoutData,
  loadLabelsData,
  loadModulesData,
  setAPIConfig,
  loadXappConfigData,
} from '../actions';
import { loadHeaderData } from '../../components/common/organisms/Header/container/Header.actions';
import { loadFooterData } from '../../components/common/organisms/Footer/container/Footer.actions';
import { loadNavigationData } from '../../components/features/content/Navigation/container/Navigation.actions';
import GLOBAL_CONSTANTS from '../constants';

function* bootstrap({ payload: { pageInfo = { name: 'homepage' }, apiConfig } }) {
  const pagesList = [pageInfo.name];
  try {
    // putResolve is used to block the other actions till apiConfig is set in state, which is to be used by next bootstrap api calls
    yield putResolve(setAPIConfig(apiConfig));
    const result = yield call(bootstrapAbstractor, pagesList);
    yield put(loadLayoutData(result[pageInfo.name].items[0].layout, pageInfo.name));
    yield put(loadLabelsData(result.labels));
    yield put(loadHeaderData(result.header));
    yield put(loadNavigationData(result.navigation));
    yield put(loadFooterData(result.footer));
    yield put(loadModulesData(result.modules));
    const xappConfig = yield call(xappAbstractor.getData, GLOBAL_CONSTANTS.XAPP_CONFIG_MODULE);
    yield put(loadXappConfigData(xappConfig));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* BootstrapSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.BOOTSTRAP_API, bootstrap);
}

export default BootstrapSaga;
