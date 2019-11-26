import logger from '@tcp/core/src/utils/loggerInstance';
import ProductListingAbstractor from '@tcp/core/src/components/features/browse/ProductListing/container/ProductListingApiHandler';
import layoutAbstractor from './layout';
import labelsAbstractor from './labels';
import headerAbstractor from './header';
import footerAbstractor from './footer';
import navigationAbstractor from './navigation';
import handler from '../../handler';
import { getAPIConfig, isMobileApp, createLayoutPath } from '../../../utils';
// TODO - GLOBAL-LABEL-CHANGE - STEP 1.1 -  Uncomment this line for only global data
// import { LABELS } from '../../../reduxStore/constants';
import CACHED_KEYS from '../../../constants/cache.config';
import { defaultBrand, defaultChannel, defaultCountry, MobileChannel } from '../../api.constants';
import { setDataInRedis } from '../../../utils/redis.util';

/**
 * Asynchronous function to fetch data from service for given array of moduleIds
 * @param {String} page Page name to be loaded, needs to be in sync with GraphQL query
 */
const fetchBootstrapData = async (
  { page, labels, brand, country, channel, lang },
  bootstrapModules
) => {
  logger.info('bootstrap received language ', lang);
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
          pageName: page && page.match(/-([a-z])/g) ? createLayoutPath(page) : page,
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
          lang,
        };
        break;
      case 'header':
        data = {
          type: 'header',
          brand,
          country,
          channel,
          lang,
        };
        break;
      case 'footer':
        data = {
          type: 'footer',
          brand,
          country,
          channel,
          lang,
        };
        break;
      case 'navigation':
        data = {
          brand,
          country,
          channel,
          lang,
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
const createBootstrapParams = (apiConfig, language) => {
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
    lang: language !== 'en' ? language : '', // TODO: Remove Temporary Check for en support as not supported from CMS yet
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

export const shouldInitiateSSRCall = (originalUrl, deviceType) =>
  originalUrl.includes('/c/') && deviceType === 'bot' && typeof window === 'undefined';

/**
 * This function parses Error out of response
 * @param {*} bootstrapData Response from API call
 * @param {*} pageName Page Name
 */
const checkAndLogErrors = (bootstrapData, pageName) => {
  const { labels, header, footer, navigation } = bootstrapData;
  const { errorMessage: headerErrorMessage } = header;
  const errorObject = {
    header_error: 0,
    footer_error: 0,
    navigation_error: 0,
    labels_error: 0,
    layout_error: 0,
  };

  try {
    if (headerErrorMessage) {
      errorObject.header_error = 1;
      errorObject.header_error_message = headerErrorMessage;
      logger.error(`Error occurred in header query ${headerErrorMessage}`);
    }
    const { errorMessage: footerErrorMessage } = footer;
    if (footerErrorMessage) {
      errorObject.footer_error = 1;
      errorObject.footer_error_message = footerErrorMessage;
      logger.error(`Error occurred in footer query ${footerErrorMessage}`);
    }
    const [{ errorMessage: navigationErrorMessage }] = navigation;
    if (navigationErrorMessage) {
      errorObject.navigation_error = 1;
      errorObject.navigation_error_message = navigationErrorMessage;
      logger.error(`Error occurred in navigation query ${navigationErrorMessage}`);
    }
    const [{ errorMessage: labelsErrorMessage }] = labels;
    if (labelsErrorMessage) {
      errorObject.labels_error = 1;
      errorObject.labels_error_message = labelsErrorMessage;
      logger.error(`Error occurred in labels query ${labelsErrorMessage}`);
    }
    const { errorMessage: layoutErrorMessage } = pageName ? bootstrapData[pageName] : {};
    if (layoutErrorMessage) {
      errorObject.layout_error = 1;
      errorObject.layout_error_message = layoutErrorMessage;
      logger.error(`Error occurred in layout query ${layoutErrorMessage}`);
    }
  } catch (e) {
    logger.error(`Error Occurred While Parsing error response`);
  }

  return errorObject;
};

/**
 * This function returns parsed response from the bootstrap API
 * @param {*} response
 * @param {*} fetchCachedDataParams
 * @param {*} bootstrapData
 */
const parsedResponse = async (
  response,
  fetchCachedDataParams,
  bootstrapData,
  state,
  originalUrl,
  deviceType
) => {
  try {
    response.header = headerAbstractor.processData(
      retrieveCachedData({ ...fetchCachedDataParams, key: 'header' })
    );
  } catch (e) {
    logger.error(`Error occurred while processing header data: ${e}`);
  }

  try {
    response.footer =
      bootstrapData.footer &&
      footerAbstractor.processData(retrieveCachedData({ ...fetchCachedDataParams, key: 'footer' }));
  } catch (e) {
    logger.error(`Error occurred while processing footer data: ${e}`);
  }

  try {
    response.labels = labelsAbstractor.processData(
      retrieveCachedData({ ...fetchCachedDataParams, key: 'labels' })
    );
  } catch (e) {
    logger.error(`Error occurred while processing labels data: ${e}`);
  }

  try {
    response.navigation = navigationAbstractor.processData(
      retrieveCachedData({ ...fetchCachedDataParams, key: 'navigation' })
    );
  } catch (e) {
    logger.error(`Error occurred while processing navigation data: ${e}`);
  }

  try {
    if (shouldInitiateSSRCall(originalUrl, deviceType)) {
      response.PLP = await ProductListingAbstractor({
        navigationData: response.navigation,
        location: { pathname: originalUrl },
        state,
      });
    }
  } catch (e) {
    logger.error(`Error occurred while processing PLP data: ${e}`);
  }

  return response;
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
const bootstrap = async (pageName = '', modules, cachedData, state, originalUrl, deviceType) => {
  const response = {};
  const apiConfig = getAPIConfig();
  const { language } = apiConfig;
  const bootstrapParams = { page: pageName, ...createBootstrapParams(apiConfig, language) };

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
    const layoutPageName =
      pageName && pageName.match(/-([a-z])/g) ? createLayoutPath(pageName) : pageName;
    const errorObject = checkAndLogErrors(bootstrapData, layoutPageName);
    logger.info('Bootstrap Query Executed Successfully');
    logger.debug('Bootstrap Query Result: ', bootstrapData);
    const fetchCachedDataParams = { bootstrapData, cachedData };

    if (layoutPageName && !errorObject.layout_error) {
      try {
        response[layoutPageName] = bootstrapData[layoutPageName];
        logger.info(
          'Executing Modules Query with params: ',
          bootstrapData[layoutPageName],
          layoutPageName
        );
        response.modules =
          bootstrapData[layoutPageName] &&
          (await layoutAbstractor.getModulesFromLayout(
            retrieveCachedData({ ...fetchCachedDataParams, key: layoutPageName }),
            language
          ));
        logger.info('Modules Query Executed Successfully');
        logger.debug('Modules Query Result: ', response.modules);
      } catch (e) {
        logger.error('Error occurred in modules query: ', e);
      }
    }

    return parsedResponse(
      response,
      fetchCachedDataParams,
      bootstrapData,
      state,
      originalUrl,
      deviceType
    );
  } catch (error) {
    logger.error('Error occurred in bootstrap query: ', error);
  }
  return response;
};

export default bootstrap;
