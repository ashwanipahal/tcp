import mock from './mock';
import handler from '../../../handler';
import { getAPIConfig, isMobileApp } from '../../../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../../api.constants';
import { DEFAULT_XAPP_CONFIG_TTL } from '../../../../config/site.config';
import { getDataFromRedis, setDataInRedis } from '../../../../utils/redis.util';

/**
 * Abstractor layer for loading data from API for Labels related components
 */
const Abstractor = {
  getData: async module => {
    const xappData = await Abstractor.getDataFromCache();
    if (xappData) {
      return JSON.parse(xappData);
    }
    const apiConfig = getAPIConfig();
    const data = {
      brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
      channel: defaultChannel,
      country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
    };
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData)
      .then(Abstractor.setDataInCache);
  },
  setDataInCache: data => {
    const { CACHE_EXP_MODIFIER, CACHE_EXP_TIME, CACHE_IDENTIFIER } = DEFAULT_XAPP_CONFIG_TTL;
    if (!isMobileApp()) {
      setDataInRedis({
        data,
        CACHE_IDENTIFIER,
        CACHE_EXP_MODIFIER,
        CACHE_EXP_TIME,
      });
    }
  },
  getDataFromCache: () => {
    if (isMobileApp()) {
      return null;
    }
    const { CACHE_IDENTIFIER } = DEFAULT_XAPP_CONFIG_TTL;
    return getDataFromRedis(CACHE_IDENTIFIER);
  },
  getMock: () => {
    return Abstractor.processData(mock);
  },
  processData: ({ configurationKey = [] }) => {
    const xappConfig = {};
    configurationKey.forEach(({ key, value }) => {
      xappConfig[key] = value;
    });
    return xappConfig;
  },
};
export default Abstractor;
