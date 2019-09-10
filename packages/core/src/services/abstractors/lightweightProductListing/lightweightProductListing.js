import mock from './mock';
import { executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';

/**
 * Abstractor layer for loading Product List Tabs data
 */
const Abstractor = {
  getData: ({ categoryId, rows = 15, fields = 'imageUrl,seo_token' }) => {
    const payload = {
      body: {
        start: 0,
        rows,
        variants: true,
        'variants.count': 0,
        version: 'V2',
        pagetype: 'boolean',
        'p-id': `categoryPathId:"${categoryId}"`,
        fields,
      },
      webService: endpoints.getProductviewbyCategory,
    };

    return executeUnbxdAPICall(payload)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  getMock: () => {
    return mock;
  },
  processData: res => {
    return res.body.response.products;
  },
  // eslint-disable-next-line no-console
  handleError: e => console.log(e),
};
export default Abstractor;
