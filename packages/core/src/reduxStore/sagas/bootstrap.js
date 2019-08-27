import { call, put, putResolve, takeLatest } from 'redux-saga/effects';
import bootstrapAbstractor from '../../services/abstractors/bootstrap';
import {
  loadLayoutData,
  loadLabelsData,
  loadModulesData,
  setAPIConfig,
  setDeviceInfo,
  setCountry,
  setCurrency,
  setLanguage,
} from '../actions';
import { loadHeaderData } from '../../components/common/organisms/Header/container/Header.actions';
import { loadFooterData } from '../../components/common/organisms/Footer/container/Footer.actions';
import { loadNavigationData } from '../../components/features/content/Navigation/container/Navigation.actions';
import GLOBAL_CONSTANTS from '../constants';

function* bootstrap(params) {
  const {
    payload: { name: pageName = 'homepage', modules, apiConfig, deviceType },
  } = params;
  const pagesList = [pageName];
  const modulesList = modules;
  try {
    // putResolve is used to block the other actions till apiConfig is set in state, which is to be used by next bootstrap api calls
    yield putResolve(setAPIConfig(apiConfig));
    yield putResolve(setDeviceInfo({ deviceType }));
    const result = yield call(bootstrapAbstractor, pagesList, modulesList);
    yield put(loadLayoutData(result[pageName].items[0].layout, pageName));
    yield put(loadLabelsData(result.labels));
    yield put(loadHeaderData(result.header));
    yield put(loadNavigationData(result.navigation));
    yield put(loadFooterData(result.footer));
    yield put(loadModulesData(result.modules));
    const { country, currency, language } = apiConfig;
    yield put(setCountry(country));
    yield put(setCurrency(currency));
    yield put(setLanguage(language));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* BootstrapSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.BOOTSTRAP_API, bootstrap);
}

export default BootstrapSaga;
