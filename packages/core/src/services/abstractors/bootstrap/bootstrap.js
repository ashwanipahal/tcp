import logger from '@tcp/core/src/utils/loggerInstance';
import layoutAbstractor from './layout';
import labelsAbstractor from './labels';
import headerAbstractor from './header';
import footerAbstractor from './footer';
import navigationAbstractor from './navigation';
import handler from '../../handler';
import { getAPIConfig, isMobileApp } from '../../../utils';
// TODO - GLOBAL-LABEL-CHANGE - STEP 1.1 -  Uncomment this line for only global data
// import { LABELS } from '../../../reduxStore/constants';
import CACHED_KEYS from '../../../constants/cache.config';
import { defaultBrand, defaultChannel, defaultCountry, MobileChannel } from '../../api.constants';
import { setDataInRedis } from '../../../utils/redis.util';

/**
 * Asynchronous function to fetch data from service for given array of moduleIds
 * @param {String} page Page name to be loaded, needs to be in sync with GraphQL query
 */
const fetchBootstrapData = async ({ page, labels, brand, country, channel }, bootstrapModules) => {
  /**
   * Sets up query params for page requests
   */
  const pageBootstrapParams = page
    ? {
        name: 'layout',
        data: {
          path: page,
          brand,
          country,
          channel,
        },
      }
    : {};

  /**
   * Sets up query params for global modules requests - (labels, header, footer, navigation)
   */
  const globalBootstrapParams = bootstrapModules.map(module => {
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
        data = page;
    }

    return {
      name: module,
      data,
    };
  });
  const bootstrapParams = globalBootstrapParams;
  if (pageBootstrapParams.data) {
    bootstrapParams.push(pageBootstrapParams);
  }
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
      // TODO - GLOBAL-LABEL-CHANGE - STEP 1.2 -  Uncomment this line for only global data
      // TODO - Mobile app should also follows the same pattern
      // category: LABELS.global,
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
    logger.info(`BOOTSTRAP CACHE HIT: ${key}`);
    try {
      return JSON.parse(cachedKeyData);
    } catch (err) {
      logger.error(err);
    }
  }

  logger.info(`BOOTSTRAP CACHE MISS: ${key}`);
  Object.keys(CACHED_KEYS).forEach(async item => {
    if (CACHED_KEYS[item] === key) {
      const globalRedisClient = global.redisClient;
      if (globalRedisClient && globalRedisClient.connected) {
        try {
          await setDataInRedis({
            data: bootstrapData[key],
            CACHE_IDENTIFIER: item,
          });
        } catch (err) {
          logger.error(err);
        }
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
 * @param {String} pageName
 * @param {module} Array ['header', 'footer', 'layout', 'navigation']
 */
const bootstrap = async (pageName = '', modules, cachedData) => {
  const response = {};

  const bootstrapParams = { page: pageName, ...createBootstrapParams() };

  /**
   * Config Responsible for making all the http requests that need to be resolved before loading the application
   *  -   Header
   *  -   Footer
   *  -   Labels
   *  -   Navigation
   */
  const bootstrapModules = modules || ['labels', 'header', 'footer', 'navigation'];

  try {
    logger.info('Executing Bootstrap Query for global modules: ', bootstrapModules);
    logger.debug('Executing Bootstrap Query with params: ', bootstrapParams, pageName);
    const bootstrapData = await fetchBootstrapData(bootstrapParams, bootstrapModules);
    logger.info('Bootstrap Query Executed Successfully');
    logger.debug('Bootstrap Query Result: ', bootstrapData);
    const fetchCachedDataParams = { bootstrapData, cachedData };

    if (pageName) {
      try {
        response[pageName] = bootstrapData[pageName];
        logger.info('Executing Modules Query with params: ', bootstrapData[pageName], pageName);
        response.modules =
          bootstrapData[pageName] &&
          (await layoutAbstractor.getModulesFromLayout(
            retrieveCachedData({ ...fetchCachedDataParams, key: pageName })
          ));
        logger.info('Modules Query Executed Successfully');
        logger.debug('Modules Query Result: ', response.modules);
      } catch (e) {
        logger.error('Error occurred in modules query: ', e);
      }
    }

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
    logger.error('Error occurred in bootstrap query: ', error);
  }
  return response;
};

export default bootstrap;
