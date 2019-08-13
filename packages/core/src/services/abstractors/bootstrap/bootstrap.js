import layoutAbstractor from './layout';
import labelsAbstractor from './labels';
import headerAbstractor from './header';
import footerAbstractor from './footer';
import navigationAbstractor from './navigation';
import handler from '../../handler';
import { getAPIConfig } from '../../../utils';

import { defaultBrand, defaultChannel, defaultCountry } from '../../api.constants';

/**
 * Config Responsible for making all the http requests that need to be resolved before loading the application
 *  -   Header
 *  -   Footer
 *  -   Labels
 *  -   Navigation
 */
const bootstrapModules = ['labels', 'header', 'footer', 'navigation'];

/**
 * Asynchronous function to fetch data from service for given array of moduleIds
 * @param {String} page Page name to be loaded, needs to be in sync with GraphQL query
 */
const fetchBootstrapData = async ({ pages, labels, brand, country, channel }) => {
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
const bootstrap = async pages => {
  const response = {};
  const apiConfig = typeof getAPIConfig === 'function' ? getAPIConfig() : '';
  const bootstrapParams = {
    pages,
    labels: {
      category: 'global',
    },
    brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
    channel: defaultChannel,
    country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
  };

  // TODO - This should be ideally done in Handler of graphQL
  try {
    const bootstrapData = await fetchBootstrapData(bootstrapParams);
    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
      // eslint-disable-next-line no-await-in-loop
      response[pages] = bootstrapData[page];
    }
    response.modules = await layoutAbstractor.processData(bootstrapData.homepage);
    response.header = headerAbstractor.processData(bootstrapData.header);
    response.footer = footerAbstractor.processData(bootstrapData.footer);
    response.labels = labelsAbstractor.processData(bootstrapData.labels);
    response.navigation = navigationAbstractor.processData(bootstrapData.navigation);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return response;
};

export default bootstrap;
