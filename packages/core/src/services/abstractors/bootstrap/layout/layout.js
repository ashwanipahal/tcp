import logger from '@tcp/core/src/utils/loggerInstance';
import mock from './mock';
import module2ColumnMock from './module2ColumnMock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for Layout
 */
const LayoutAbstractor = {
  /**
   * This function loads data from graphQL service
   * @param {Object} params Object containing {page, brand, country, channel}
   */
  getLayoutData: async ({ page, brand, country, channel }) => {
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
        },
      })
      .then(response => {
        const result = response.data[page];
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
  getModulesFromLayout: async data => {
    // Adding Module 2 columns mock
    const layoutResponse = data.items;
    layoutResponse[0].layout.slots.push(module2ColumnMock);
    const moduleObjects = LayoutAbstractor.collateModuleObject(data.items);
    return LayoutAbstractor.getModulesData(moduleObjects).then(response => {
      return LayoutAbstractor.processModuleData(response.data);
    });
  },
  /**
   * Processes data to create an array of content IDs with slot information
   * @param {*} items
   */
  collateModuleObject: items => {
    const moduleIds = [];
    items.forEach(({ layout: { slots } }) => {
      slots.forEach(slot => {
        if (slot.contentId) {
          const contentIds = slot.contentId.split(',');
          if (contentIds.length > 1) {
            const moduleNames = slot.val.split(',');
            contentIds.forEach((contentId, index) => {
              const moduleName = moduleNames[index];
              moduleIds.push({
                name: moduleName,
                data: {
                  contentId,
                  slot: `${slot.name}_${index}`,
                },
              });
            });
          } else {
            moduleIds.push({
              name: slot.moduleName,
              data: {
                contentId: slot.contentId,
                slot: slot.name,
              },
            });
          }
        }
      });
    });
    return moduleIds;
  },
  processModuleData: moduleData => {
    const modulesObject = {};
    Object.keys(moduleData).forEach(slotKey => {
      const { set = [] } = moduleData[slotKey];
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
