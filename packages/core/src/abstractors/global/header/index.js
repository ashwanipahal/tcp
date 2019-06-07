import mock from './mock';
/**
 * Abstractor layer for loading data from API for Header related components
 */
export default (headerAbstractor = {
  getHeaderData: async () => {
    return mock;
  },
});
