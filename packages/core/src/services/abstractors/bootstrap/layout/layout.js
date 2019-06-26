import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for Layout
 */
const LayoutAbstractor = {
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
  getModulesData: modules => {
    return handler.fetchDataFromGraphQL(modules);
  },
  getMock: () => {
    return mock;
  },
};

export default LayoutAbstractor;
