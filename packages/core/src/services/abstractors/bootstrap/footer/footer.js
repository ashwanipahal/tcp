import mock from './mock';
/**
 * Abstractor layer for loading data from API for Footer related components
 */
export default {
  getFooterData: async () => {
    return mock;
  },
  processData: data => data,
};
