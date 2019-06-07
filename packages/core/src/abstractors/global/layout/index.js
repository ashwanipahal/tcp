import mock from './mock';
/**
 * Abstractor layer for loading data from API for Layout
 */
export default (layoutAbstractor = {
  getLayoutData: async () => {
    return mock;
  },
});
