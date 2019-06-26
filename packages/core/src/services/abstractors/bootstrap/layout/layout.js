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
  getLayoutData: page => {
    return handler
      .fetchDataFromGraphQL({
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
  getModulesData: modules => {
    return handler.fetchDataFromGraphQL(modules);
  },
  /**
   * Return mock for Layout response
   */
  getMock: () => {
    return mock;
  },
};

export default LayoutAbstractor;
