import { call, put, putResolve, takeLatest } from 'redux-saga/effects';
import bootstrapAbstractor from '../../services/abstractors/bootstrap';
import xappAbstractor from '../../services/abstractors/bootstrap/xappConfig';
import {
  loadLayoutData,
  loadLabelsData,
  loadModulesData,
  setAPIConfig,
  loadXappConfigData,
  setDeviceInfo,
  setOptimizelyFeaturesList,
  setCountry,
  setCurrency,
  setLanguage,
} from '../actions';
import { loadHeaderData } from '../../components/common/organisms/Header/container/Header.actions';
import { loadFooterData } from '../../components/common/organisms/Footer/container/Footer.actions';
import { loadNavigationData } from '../../components/features/content/Navigation/container/Navigation.actions';
import GLOBAL_CONSTANTS from '../constants';
import { isMobileApp } from '../../utils/utils.app';

// TODO - GLOBAL-LABEL-CHANGE - STEP 1.3 - Uncomment these references
// import GLOBAL_CONSTANTS, { LABELS } from '../constants';
// import { loadLayoutData, loadLabelsData, setLabelsData, loadModulesData, setAPIConfig } from '../actions';

function* bootstrap(params) {
  const {
    payload: {
      name: pageName = 'homepage',
      modules,
      apiConfig,
      deviceType,
      optimizelyHeadersObject,
    },
  } = params;
  const { country, currency, language } = apiConfig;
  const pagesList = [pageName];
  const modulesList = modules;
  try {
    // putResolve is used to block the other actions till apiConfig is set in state, which is to be used by next bootstrap api calls
    yield putResolve(setAPIConfig(apiConfig));
    yield putResolve(setDeviceInfo({ deviceType }));
    yield putResolve(setOptimizelyFeaturesList(optimizelyHeadersObject));
    const result = yield call(bootstrapAbstractor, pagesList, modulesList);
    yield put(loadLayoutData(result[pageName].items[0].layout, pageName));
    yield put(loadLabelsData(result.labels));
    // TODO - GLOBAL-LABEL-CHANGE - STEP 1.4 - Remove loadLabelsData and uncomment this new code
    //  yield put(setLabelsData({ category:LABELS.global, data:result.labels
    // }));
    yield put(loadHeaderData(result.header));
    if (!isMobileApp()) yield put(loadNavigationData(result.navigation));

    yield put(loadFooterData(result.footer));
    yield put(loadModulesData(result.modules));
    yield put(setCountry(country));
    yield put(setCurrency(currency));
    yield put(setLanguage(language));
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
