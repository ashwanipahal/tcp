/* eslint-disable complexity */
import { all, call, put, putResolve, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { setPlpProductsDataOnServer } from '@tcp/core/src/components/features/browse/ProductListing/container/ProductListing.actions';
import { getAPIConfig } from '@tcp/core/src/utils';
import { API_CONFIG } from '@tcp/core/src/services/config';
import { getNavigationData } from '@tcp/core/src/services/abstractors/common/subNavigation';
import bootstrapAbstractor from '../../services/abstractors/bootstrap';
import setUserGroup from '../../services/abstractors/common/setUserGroup';
import xappAbstractor from '../../services/abstractors/bootstrap/xappConfig';
import countryListAbstractor from '../../services/abstractors/bootstrap/countryList';
import {
  loadLayoutData,
  loadLabelsData,
  loadModulesData,
  setAPIConfig,
  loadXappConfigData,
  loadXappConfigDataOtherBrand,
  setDeviceInfo,
  setOptimizelyFeaturesList,
  setCountry,
  setCurrency,
  setLanguage,
  storeCountriesMap,
  storeCurrenciesMap,
  getSetTcpSegment,
  setSubNavigationData,
} from '../actions';
import { loadHeaderData } from '../../components/common/organisms/Header/container/Header.actions';
import { loadFooterData } from '../../components/common/organisms/Footer/container/Footer.actions';
import { loadNavigationData } from '../../components/features/content/Navigation/container/Navigation.actions';
import GLOBAL_CONSTANTS, { MODULES_CONSTANT } from '../constants';
import CACHED_KEYS from '../../constants/cache.config';
import { isMobileApp, getCurrenciesMap, getCountriesMap } from '../../utils';
import { getDataFromRedis } from '../../utils/redis.util';
import { readCookie, setCookie } from '../../utils/cookie.util';

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
      originalUrl,
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

      const { brandIdCMS } = getAPIConfig();
      const xappConfigOtherBrand = yield call(
        xappAbstractor.getData,
        GLOBAL_CONSTANTS.XAPP_CONFIG_MODULE,
        brandIdCMS === API_CONFIG.TCP_CONFIG_OPTIONS.brandIdCMS
          ? API_CONFIG.GYM_CONFIG_OPTIONS
          : API_CONFIG.TCP_CONFIG_OPTIONS
      );
      yield put(loadXappConfigDataOtherBrand(xappConfigOtherBrand));
    }
    const state = yield select();
    const result = yield call(
      bootstrapAbstractor,
      pageName,
      modulesList,
      cachedData,
      state,
      originalUrl,
      deviceType
    );
    if (result.PLP) {
      const { layout, modules: plpModules, pageName: layoutName, res } = result.PLP;
      yield put(loadLayoutData(layout, layoutName));
      yield put(loadModulesData(plpModules));
      yield put(setPlpProductsDataOnServer(res));
    }
    if (pageName) {
      yield put(loadLayoutData(result[pageName].items[0].layout, pageName));
      /**
       * Fetching the placholder content Ids so that sub navigation call can be made
       * By fetching sub navigation sub category stored in placeholder module key val.
       */
      const placeHolderIdList = Object.keys(result.modules).filter(
        module => result.modules[module].moduleName === MODULES_CONSTANT.placeholder
      );
      yield put(loadModulesData(result.modules));
      const { country, brand } = apiConfig;
      if (placeHolderIdList.length > 0) {
        const placeholderResult = yield all(
          placeHolderIdList.map(listItem =>
            result.modules[listItem].moduleClassName === MODULES_CONSTANT.subNavigation
              ? call(getNavigationData, result.modules[listItem].val, brand, country)
              : null
          )
        );
        yield all(
          placeholderResult.map(results => put(setSubNavigationData(results.val, results.key)))
        );
      }
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

function* setTcpSegment(tcpSegment) {
  const tcpSegmentValue = tcpSegment.payload;
  yield put(getSetTcpSegment(tcpSegmentValue));
  const tcpSegmentCookieValue = yield call(readCookie, 'tcpSegment');

  if ((tcpSegmentValue && tcpSegmentCookieValue !== tcpSegmentValue) || !tcpSegmentCookieValue) {
    yield call(setCookie, { key: 'tcpSegment', value: tcpSegmentValue });
    return yield call(setUserGroup);
  }
  return null;
}

function* BootstrapSaga() {
  yield takeLatest(GLOBAL_CONSTANTS.BOOTSTRAP_API, bootstrap);
  yield takeLatest(GLOBAL_CONSTANTS.SET_TCP_SEGMENT_METHOD_CALL, setTcpSegment);
}

export default BootstrapSaga;
