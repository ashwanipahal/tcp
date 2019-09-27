import mock from './mock';
import { executeExternalAPICall } from '../../handler';
import endpoints from '../../endpoints';

/**
 * Abstractor layer for loading Product List Tabs data
 */
const Abstractor = {
  /**
   * @param {Object} params Should have {id, count}. Id is item id of stylitics. Count is total
   * number of the product. Count is optional.
   * @return {Object} return Promise.
   */
  getData: params => {
    const { id, count = 7 } = params;

    const payload = {
      body: {
        username: 'thechildrensplace',
        region: 'US',
        total: count,
        item_number: id,
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
    const rootPath = 'https://www.childrensplace.com/us/outfit';

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

      const subItemsPath = subItems.map(({ remote_id: remoteId }) => remoteId).join('-');

      return {
        id,
        imageUrl,
        largeImageUrl,
        items,
        pdpUrl: `${rootPath}/${item.id}/${subItemsPath}`,
      };
    });
  },
  // eslint-disable-next-line no-console
  handleError: e => console.log(e),
};
export default Abstractor;
