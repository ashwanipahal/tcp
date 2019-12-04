import logger from '@tcp/core/src/utils/loggerInstance';
import mock from './mock';
import handler from '../../../handler';
import { getAPIConfig, isMobileApp, getCacheKeyForRedis } from '../../../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../../api.constants';
import { DEFAULT_XAPP_CONFIG_TTL } from '../../../../config/site.config';
import { getDataFromRedis } from '../../../../utils/redis.util';

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
      .then(Abstractor.processData);
  },
  getDataFromCache: configOptions => {
    if (isMobileApp()) {
      return null;
    }
    const { CACHE_IDENTIFIER } = DEFAULT_XAPP_CONFIG_TTL;
    const { RWD_WEB_ENV_ID = '' } = process.env;
    const { brandIdCMS, siteIdCMS, channelId } = configOptions;
    const cacheKey = getCacheKeyForRedis(
      `${CACHE_IDENTIFIER}:${brandIdCMS}-${siteIdCMS}-${channelId}__${RWD_WEB_ENV_ID.toLowerCase()}`
    );
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
};
export default Abstractor;
