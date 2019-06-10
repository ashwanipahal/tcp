import mock from './mock';
/**
 * Abstractor layer for loading data from API for Labels
 */
export default (moduleDAbstractor = {
  getModuleDData: async () => {
    return mock;
  },
});
