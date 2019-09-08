import logger from '@tcp/core/src/utils/loggerInstance';
import layoutAbstractor from './layout';
import labelsAbstractor from './labels';
import headerAbstractor from './header';
import footerAbstractor from './footer';
import navigationAbstractor from './navigation';
import handler from '../../handler';
import { getAPIConfig, isMobileApp } from '../../../utils';
import { LABELS } from '../../../reduxStore/constants';
import CACHED_KEYS from '../../../constants/cache.config';
import { defaultBrand, defaultChannel, defaultCountry, MobileChannel } from '../../api.constants';
import { setDataInRedis } from '../../../utils/redis.util';

/**
 * Asynchronous function to fetch data from service for given array of moduleIds
 * @param {String} page Page name to be loaded, needs to be in sync with GraphQL query
 */
const fetchBootstrapData = async ({ pages, labels, brand, country, channel }, modules) => {
  /**
   * Config Responsible for making all the http requests that need to be resolved before loading the application
   *  -   Header
   *  -   Footer
   *  -   Labels
   *  -   Navigation
   */
  const bootstrapModules = modules || ['labels', 'header', 'footer', 'navigation'];
  /**
   * Sets up query params for page requests
   */
  const pageBootstrapParams = pages.map(page => ({
    name: 'layout',
    data: {
      path: page,
      brand,
      country,
      channel,
    },
  }));

  /**
   * Sets up query params for modules requests
   */
  const modulesBootstrapParams = bootstrapModules.map(module => {
    let data = {};
    switch (module) {
      case 'labels':
        data = {
          category: labels.category,
          subCategory: labels.subCategory,
          brand,
          country,
          channel,
        };
        break;
      case 'header':
        data = {
          type: 'header',
          brand,
          country,
          channel,
        };
        break;
      case 'footer':
        data = {
          type: 'footer',
          brand,
          country,
          channel,
        };
        break;
      case 'navigation':
        data = {
          brand,
          country,
          channel,
        };
        break;
      default:
        data = pages;
    }

    return {
      name: module,
      data,
    };
  });
  const bootstrapParams = [...pageBootstrapParams, ...modulesBootstrapParams];
  return handler.fetchModuleDataFromGraphQL(bootstrapParams).then(response => response.data);
};

/**
 * Generate base bootstrap parameters
 */
const createBootstrapParams = () => {
  const apiConfig = getAPIConfig();
  const channelName = isMobileApp() ? MobileChannel : defaultChannel;
  return {
    labels: {
      category: LABELS.global,
    },
    brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
    channel: channelName,
    country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
  };
};

/**
 * Get cached Data
 * @param {Array} pages
 */
export const retrieveCachedData = ({ cachedData, key, bootstrapData }) => {
  const cachedKeyData = cachedData[key];
  if (cachedKeyData) {
    logger.info('CACHE HIT');
    try {
      return JSON.parse(cachedKeyData);
    } catch (err) {
      logger.error(err);
    }
  }

  logger.info('CACHE MISS');
  Object.keys(CACHED_KEYS).forEach(async item => {
    if (CACHED_KEYS[item] === key) {
      const globalRedisClient = global.redisClient;
      if (globalRedisClient && globalRedisClient.connected) {
        await setDataInRedis({
          data: bootstrapData[key],
          CACHE_IDENTIFIER: item,
        });
      }
    }
  });
  return bootstrapData[key];
};

/**
 * Responsible for making all the http requests that need to be resolved before loading the application
 *  -   Layout
 *  -   Header
 *  -   Footer
 *  -   Labels
 * @param {Array} pages
 */
const bootstrap = async (pages, modules, cachedData) => {
  const response = {};
  const bootstrapParams = { pages, ...createBootstrapParams() };

  try {
    const bootstrapData = await fetchBootstrapData(bootstrapParams, modules);
    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
      // eslint-disable-next-line no-await-in-loop
      response[page] = bootstrapData[page];
    }

    const fetchCachedDataParams = { bootstrapData, cachedData };
    response.modules =
      bootstrapData.homepage &&
      (await layoutAbstractor.processData(
        retrieveCachedData({ ...fetchCachedDataParams, key: 'homepage' })
      ));
    response.header = headerAbstractor.processData(
      retrieveCachedData({ ...fetchCachedDataParams, key: 'header' })
    );
    response.footer =
      bootstrapData.footer &&
      footerAbstractor.processData(retrieveCachedData({ ...fetchCachedDataParams, key: 'footer' }));
    response.labels = labelsAbstractor.processData(
      retrieveCachedData({ ...fetchCachedDataParams, key: 'labels' })
    );
    response.navigation = navigationAbstractor.processData(
      retrieveCachedData({ ...fetchCachedDataParams, key: 'navigation' })
    );
  } catch (error) {
    logger.error(error);
  }
  return response;
};

export default bootstrap;
