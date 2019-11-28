import logger from '@tcp/core/src/utils/loggerInstance';
import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for Layout
 */
const LayoutAbstractor = {
  slotModuleMap: {},
  /**
   * This function loads data from graphQL service
   * @param {Object} params Object containing {page, brand, country, channel}
   */
  getLayoutData: async ({ page, brand, country, channel, pageName }) => {
    logger.info(`Executing Layout Query for ${page}: `);
    logger.debug(
      'Executing Layout Query with params: ',
      `page:${page}`,
      `brand:${brand}`,
      `country:${country}`,
      `channel:${channel}`
    );
    return handler
      .fetchModuleDataFromGraphQL({
        name: 'layout',
        data: {
          path: page,
          brand,
          country,
          channel,
          pageName: pageName && pageName.match(/-([a-z])/g) ? createLayoutPath(pageName) : pageName,
        },
      })
      .then(response => {
        const formattedPageName =
          pageName && pageName.match(/-([a-z])/g) ? createLayoutPath(pageName) : pageName;
        const result = response.data[formattedPageName || page];
        logger.info('Layout Query Executed Successfully');
        logger.debug('Layout Query Result: ', result);
        return result;
      });
  },
  /**
   * This function loads data for a set of modules from graphQL service
   * @param {Array} modules Array of Objects with below structure
   * eg.{
        name: "layout",
        data: {
          contentId: "abcd",
          slot: "slot_1",
        },
      }
   *
   */
  getModulesData: async modules => {
    return handler.fetchModuleDataFromGraphQL(modules);
  },
  /**
   * Asynchronous function to get modules data from service for layouts
   * @param {Object} data Response object for layout query
   */
  getModulesFromLayout: async (data, language, page) => {
    logger.info('module received language ', language);
    // Adding Module 2 columns mock
    const layoutResponse = data.items;

    const moduleObjects = LayoutAbstractor.collateModuleObject(layoutResponse, language);
    return LayoutAbstractor.getModulesData(moduleObjects).then(response => {
      return LayoutAbstractor.processModuleData(response.data, page);
    });
  },
  /**
   * Processes data to create an array of content IDs with slot information
   * @param {*} items
   */
  collateModuleObject: (items, language) => {
    const moduleIds = [];
    items.forEach(({ layout: { slots } }) => {
      slots.forEach(slot => {
        LayoutAbstractor.slotModuleMap[slot.name] = slot;
        if (slot.contentId) {
          const contentIds = slot.contentId.split(',');
          if (contentIds.length > 1) {
            const moduleNames = slot.value.split(',');
            contentIds.forEach((contentId, index) => {
              const moduleName = moduleNames[index];
              moduleIds.push({
                name: moduleName,
                data: {
                  contentId,
                  slot: `${slot.name}_${index}`,
                  lang: language !== 'en' ? language : '', // TODO: Remove Temporary Check for en support, as not supported from CMS yet
                },
              });
            });
          } else {
            moduleIds.push({
              name: slot.moduleName,
              data: {
                contentId: slot.contentId,
                slot: slot.name,
                lang: language !== 'en' ? language : '', // TODO: Remove Temporary Check for en support, as not supported from CMS yet
              },
            });
          }
        }
      });
    });
    return moduleIds;
  },
  checkForErrors: (data, slotKey, page) => {
    const { errorMessage } = data;
    if (errorMessage) {
      const { moduleName, contentId } = LayoutAbstractor.slotModuleMap[slotKey];
      logger.error(
        `Error occurred on page ${page} in module ${moduleName} {contentId: ${contentId}}-> ${errorMessage}`
      );
    }
  },
  processModuleData: (moduleData, page) => {
    const modulesObject = {};
    Object.keys(moduleData).forEach(slotKey => {
      LayoutAbstractor.checkForErrors(moduleData[slotKey], slotKey, page);
      let { set } = moduleData[slotKey];
      if (!set) {
        set = [];
      }
      modulesObject[moduleData[slotKey].contentId] = {
        ...moduleData[slotKey].composites,
        moduleName: moduleData[slotKey].name,
        set,
      };
      set.forEach(({ key, val }) => {
        modulesObject[moduleData[slotKey].contentId][key] = val;
      });
    });
    return modulesObject;
  },
  /**
   * Return mock for Layout response
   */
  getMock: () => {
    return mock;
  },
};

export default LayoutAbstractor;
