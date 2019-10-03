import mock from './mock';
import { executeExternalAPICall } from '../../handler';
import endpoints from '../../endpoints';

/**
 * Abstractor layer for loading Product List Tabs data
 */
const Abstractor = {
  /**
   * @param {Object} params Should have {itemId, count}. itemId is unique id of
   *  stylitics product. Count is total
   * number of the product. Count is optional.
   * @return {Object} return Promise.
   */
  getData: params => {
    const { categoryId, count = 7 } = params;

    const payload = {
      body: {
        username: 'thechildrensplace',
        region: 'US',
        total: count,
        item_number: categoryId,
      },
      webService: endpoints.getStyliticsProductViewById,
    };

    return executeExternalAPICall(payload)
      .then(Abstractor.processData)
      .catch(Abstractor.handleError);
  },
  getMock: () => {
    return mock;
  },
  processData: res => {
    const rootPath = '/outfit';

    return res.body.map(item => {
      const { image_url: imageUrl, large_image_url: largeImageUrl, id, items: subItems } = item;

      const items = subItems.map(subItem => {
        const { small_image_url: smallImageUrl, name, remote_id: remoteId } = subItem;

        return {
          smallImageUrl,
          name,
          remoteId,
        };
      });

      const subItemsId = subItems.map(({ remote_id: remoteId }) => remoteId).join('-');

      return {
        id,
        subItemsId,
        imageUrl,
        largeImageUrl,
        items,
        pdpUrl: `${rootPath}/${id}/${subItemsId}`,
      };
    });
  },
  // eslint-disable-next-line no-console
  handleError: e => console.log(e),
};
export default Abstractor;
