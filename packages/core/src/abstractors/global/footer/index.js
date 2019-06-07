import mock from './mock';
/**
 * Abstractor layer for loading data from API for Footer related components
 */
export default (footerAbstractor = {
  getFooterData: async () => {
    return mock;
  },
});
