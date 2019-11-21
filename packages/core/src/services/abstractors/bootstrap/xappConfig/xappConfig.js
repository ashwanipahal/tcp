import logger from '@tcp/core/src/utils/loggerInstance';
import mock from './mock';
import handler from '../../../handler';
import { getAPIConfig, isMobileApp, getCacheKeyForRedis } from '../../../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../../api.constants';
import { DEFAULT_XAPP_CONFIG_TTL } from '../../../../config/site.config';
import { getDataFromRedis, setDataInRedis } from '../../../../utils/redis.util';

/**
 * Abstractor layer for loading data from API for Labels related components
 */
const Abstractor = {
  getData: async (module, brand) => {
    let xappData;
    try {
      xappData = await Abstractor.getDataFromCache(brand);
    } catch (e) {
      logger.error(e);
    }
    if (xappData) {
      try {
        logger.info(`XAPP | REDIS CACHE HIT`);
        const jsonXappData = JSON.parse(xappData);
        jsonXappData.IS_DATA_FROM_REDIS = true;
        return jsonXappData;
      } catch (e) {
        logger.error('Error parsing xappData from Redis', e);
      }
    }
    const apiConfig = getAPIConfig();
    const data = {
      brand: (brand && brand.brandIdCMS) || (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
      channel: defaultChannel,
      country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
    };
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData)
      .then(processedData => Abstractor.setDataInCache(processedData, brand));
  },
  setDataInCache: (data, brand) => {
    const {
      CACHE_EXP_MODIFIER,
      CACHE_EXP_TIME,
      CACHE_IDENTIFIER: cacheKey,
    } = DEFAULT_XAPP_CONFIG_TTL;
    const CACHE_IDENTIFIER = getCacheKeyForRedis(Abstractor.createCacheKey(cacheKey, brand));
    if (!isMobileApp()) {
      setDataInRedis({
        data,
        CACHE_IDENTIFIER,
        CACHE_EXP_MODIFIER,
        CACHE_EXP_TIME,
      });
    }
    return data;
  },
  getDataFromCache: brand => {
    if (isMobileApp()) {
      return null;
    }
    const { CACHE_IDENTIFIER } = DEFAULT_XAPP_CONFIG_TTL;
    const cacheKey = getCacheKeyForRedis(Abstractor.createCacheKey(CACHE_IDENTIFIER, brand));
    return getDataFromRedis(cacheKey);
  },
  getMock: () => {
    return Abstractor.processData(mock);
  },
  processData: ({ configurationKey = [] }) => {
    const xappConfig = {};
    configurationKey.forEach(({ key, value }) => {
      xappConfig[key] = value;
    });
    xappConfig.IS_DATA_FROM_REDIS = false;
    return xappConfig;
  },
  createCacheKey: (cacheKey, brand) => `${cacheKey}${brand ? brand.brandIdCMS : ''}`,
};
export default Abstractor;
