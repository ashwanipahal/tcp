import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for Layout
 */
const LayoutAbstractor = {
  /**
   * This function loads data from graphQL service
   * @param {String} page
   */
  getLayoutData: async page => {
    return handler
      .fetchModuleDataFromGraphQL({
        name: 'layout',
        data: {
          path: page,
        },
      })
      .then(({ data }) => data[page].items);
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
   * Asynchronous function to process data from service for layouts
   * @param {Object} data Response object for layout query
   */
  processData: async data => {
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
      slots.forEach(slot =>
        moduleIds.push({
          name: slot.moduleName,
          data: {
            contentId: slot.contentId,
            slot: slot.name,
          },
        })
      );
    });
    return moduleIds;
  },
  processModuleData: moduleData => {
    const modulesObject = {};
    Object.keys(moduleData).forEach(slotKey => {
      modulesObject[moduleData[slotKey].contentId] = {
        ...moduleData[slotKey].composites,
        set: moduleData[slotKey].set,
      };
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
