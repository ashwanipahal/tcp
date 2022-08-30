import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import sitemapAbstractor from '@tcp/core/src/services/abstractors/common/sitemap';
import { validateReduxCache } from '@tcp/core/src/utils/cache.util';
import { getAPIConfig } from '@tcp/core/src/utils';
import { defaultBrand, defaultChannel, defaultCountry } from '@tcp/core/src/services/api.constants';

import SITEMAP_CONSTANTS from './SiteMap.constants';
import { setSiteMapData } from './SiteMap.actions';

export function* fetchSitemapData() {
  try {
    const apiConfig = getAPIConfig();
    const { language } = apiConfig;
    const payload = {
      brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
      channel: defaultChannel,
      country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
      lang: language !== 'en' ? language : '',
    };
    const result = yield call(sitemapAbstractor.getData, payload);
    const sitemapData = result.data.siteMap;
    yield put(setSiteMapData(sitemapData));
  } catch (err) {
    logger.error(err);
    yield null;
  }
}

function* SiteMapSaga() {
  const cachedSiteMapData = validateReduxCache(fetchSitemapData);
  yield takeLatest(SITEMAP_CONSTANTS.FETCH_SITEMAP_DATA, cachedSiteMapData);
}

export default SiteMapSaga;
