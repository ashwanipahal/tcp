import { all, call, put, putResolve, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import bootstrapAbstractor from '../../services/abstractors/bootstrap';
import xappAbstractor from '../../services/abstractors/bootstrap/xappConfig';
import countryListAbstractor from '../../services/abstractors/bootstrap/countryList';
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
  storeCountriesMap,
  storeCurrenciesMap,
} from '../actions';
import { loadHeaderData } from '../../components/common/organisms/Header/container/Header.actions';
import { loadFooterData } from '../../components/common/organisms/Footer/container/Footer.actions';
import { loadNavigationData } from '../../components/features/content/Navigation/container/Navigation.actions';
import GLOBAL_CONSTANTS from '../constants';
import CACHED_KEYS from '../../constants/cache.config';
import { isMobileApp, getCurrenciesMap, getCountriesMap } from '../../utils';
import { getDataFromRedis } from '../../utils/redis.util';

// TODO - GLOBAL-LABEL-CHANGE - STEP 1.3 - Uncomment these references
// import GLOBAL_CONSTANTS, { LABELS } from '../constants';
// import { loadLayoutData, loadLabelsData, setLabelsData, loadModulesData, setAPIConfig } from '../actions';

// eslint-disable-next-line sonarjs/cognitive-complexity
function* bootstrap(params) {
  const {
    payload: {
      name: pageName,
      modules,
      apiConfig,
      deviceType,
      optimizelyHeadersObject,
      siteConfig,
    },
  } = params;

  const cachedData = {};
  let modulesList = modules;

  Object.keys(CACHED_KEYS).forEach(async item => {
    const globalRedisClient = global.redisClient;
    if (globalRedisClient && globalRedisClient.connected) {
      let cachedLabels;
      try {
        cachedLabels = await getDataFromRedis(item);
      } catch (err) {
        logger.error(err);
      }
      if (cachedLabels) {
        modulesList = modules && modules.filter(key => key !== 'labels');
        cachedData.labels = cachedLabels;
      }
    }
  });

  try {
    if (siteConfig) {
      const { country, currency, language } = apiConfig;

      // putResolve is used to block the other actions till apiConfig is set in state, which is to be used by next bootstrap api calls
      yield putResolve(setAPIConfig(apiConfig));
      yield putResolve(setDeviceInfo({ deviceType }));
      yield putResolve(setOptimizelyFeaturesList(optimizelyHeadersObject));
      if (country) {
        yield put(setCountry(country));
      }
      if (currency) {
        yield put(setCurrency({ currency }));
      }
      if (language) {
        yield put(setLanguage(language));
      }
      const xappConfig = yield call(xappAbstractor.getData, GLOBAL_CONSTANTS.XAPP_CONFIG_MODULE);
      yield put(loadXappConfigData(xappConfig));
    }

    const result = yield call(bootstrapAbstractor, pageName, modulesList, cachedData);
    if (pageName) {
      yield put(loadLayoutData(result[pageName].items[0].layout, pageName));
      yield put(loadModulesData(result.modules));
    }
    yield put(loadLabelsData(result.labels));
    // TODO - GLOBAL-LABEL-CHANGE - STEP 1.4 - Remove loadLabelsData and uncomment this new code
    //  yield put(setLabelsData({ category:LABELS.global, data:result.labels
    // }));
    yield put(loadHeaderData(result.header));
    if (!isMobileApp()) {
      yield put(loadNavigationData(result.navigation));
      // Fetching countries and currencies data
      const response = yield call(countryListAbstractor.getData);
      const data = response && response.data.countryList;
      const countriesMap = getCountriesMap(data);
      const currenciesMap = getCurrenciesMap(data);
      yield all([put(storeCountriesMap(countriesMap)), put(storeCurrenciesMap(currenciesMap))]);
    }
    yield put(loadFooterData(result.footer));
  } catch (err) {
    logger.error(err);
  }
}

function* BootstrapSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.BOOTSTRAP_API, bootstrap);
}

export default BootstrapSaga;
