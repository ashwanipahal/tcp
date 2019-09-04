import layoutAbstractor from './layout';
import labelsAbstractor from './labels';
import headerAbstractor from './header';
import footerAbstractor from './footer';
import navigationAbstractor from './navigation';
import handler from '../../handler';
import { getAPIConfig, isMobileApp } from '../../../utils';
// TODO - GLOBAL-LABEL-CHANGE - STEP 1.1 -  Uncomment this line for only global data
// import { LABELS } from '../../../reduxStore/constants';
import { defaultBrand, defaultChannel, defaultCountry, MobileChannel } from '../../api.constants';

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
 * Responsible for making all the http requests that need to be resolved before loading the application
 *  -   Layout
 *  -   Header
 *  -   Footer
 *  -   Labels
 * @param {Array} pages
 */
const bootstrap = async (pages, modules) => {
  const response = {};
  const apiConfig = getAPIConfig();
  const channelName = isMobileApp() ? MobileChannel : defaultChannel;
  const bootstrapParams = {
    pages,
    labels: {
      // TODO - GLOBAL-LABEL-CHANGE - STEP 1.2 -  Uncomment this line for only global data
      // TODO - Mobile app should also follows the same pattern
      // category: LABELS.global,
    },
    brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
    channel: channelName,
    country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
  };

  try {
    const bootstrapData = await fetchBootstrapData(bootstrapParams, modules);

    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
      // eslint-disable-next-line no-await-in-loop
      response[page] = bootstrapData[page];
    }

    response.modules =
      bootstrapData.homepage && (await layoutAbstractor.processData(bootstrapData.homepage));
    response.header = headerAbstractor.processData(bootstrapData.header);
    response.footer = bootstrapData.footer && footerAbstractor.processData(bootstrapData.footer);
    response.labels = labelsAbstractor.processData(bootstrapData.labels);
    response.navigation = navigationAbstractor.processData(bootstrapData.navigation);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return response;
};

export default bootstrap;
