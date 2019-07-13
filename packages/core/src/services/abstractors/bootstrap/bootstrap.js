import layoutAbstractor from './layout';
import labelsAbstractor from './labels';
import headerAbstractor from './header';
import footerAbstractor from './footer';
import handler from '../../handler';
import { defaultBrand, defaultChannel, defaultCountry } from '../../config';

/**
 * Config Responsible for making all the http requests that need to be resolved before loading the application
 *  -   Header
 *  -   Footer
 *  -   Labels
 */
const bootstrapModules = ['labels', 'header', 'footer'];

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

  const bootstrapParams = {
    pages,
    labels: {},
    brand: defaultBrand,
    channel: defaultChannel,
    country: defaultCountry,
  };

  try {
    const bootstrapData = await fetchBootstrapData(bootstrapParams);
    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
      // eslint-disable-next-line no-await-in-loop
      response[pages] = bootstrapData[page];
    }
    response.modules = await layoutAbstractor.processData(bootstrapData.homepage);
    response.header = await headerAbstractor.processData(bootstrapData.header);
    response.footer = await footerAbstractor.processData(bootstrapData.footer);
    response.labels = await labelsAbstractor.processData(bootstrapData.labels);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return response;
};

export default bootstrap;
