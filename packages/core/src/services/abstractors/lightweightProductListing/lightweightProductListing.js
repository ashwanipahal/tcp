import mock from './mock';
import { executeUnbxdAPICall } from '../../handler';
import endpoints from '../../endpoints';

/**
 * Abstractor layer for loading Product List Tabs data
 */
const Abstractor = {
  getData: ({ categoryId, rows = 18, fields = 'imageUrl,seo_token,product_name' }) => {
    const payload = {
      body: {
        start: 0,
        rows,
        variants: true,
        'variants.count': 0,
        version: 'V2',
        pagetype: 'boolean',
        'p-id': `categoryPathId:"${categoryId.replace(/\|/g, '<')}"`,
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
    return res.body.response.products.map(item => {
      const {
        imageUrl: [imageUrl],
        seo_token: seoToken,
        uniqueId,
      } = item;

      return {
        ...item,
        pdpUrl: `/p?pid=${seoToken || uniqueId}`,
        pdpAsPath: `/p/${seoToken || uniqueId}`,
        /*
           In Android, the images are not loading with www.childrensplace.com domain due to
           some security issue.
           TODO: This should be removed once we start getting CDN URL from the unbxd.
        */
        imageUrl: [
          imageUrl.replace('https://www.childrensplace.com', 'https://test4.childrensplace.com'),
        ],
      };
    });
  },
  // eslint-disable-next-line no-console
  handleError: e => console.log(e),
};
export default Abstractor;
