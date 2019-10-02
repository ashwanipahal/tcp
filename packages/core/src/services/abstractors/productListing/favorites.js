import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

const addItemToWishlist = wishlistDetails => {
  const { wishlistId, skuIdOrProductId, quantity, isProduct, uniqueId } = wishlistDetails;
  const payload = {
    header: {
      externalId: wishlistId,
      addItem: true,
    },
    body: {
      item: [
        {
          productId: skuIdOrProductId,
          quantityRequested: `${quantity}`,
          isProduct: isProduct ? 'TRUE' : 'FALSE',
        },
      ],
      uniqueId,
    },
    webService: endpoints.addOrUpdateWishlist,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      //   TODO - in case of error - handle it - throw new ServiceResponseError(res);
      // }

      const newItem = res.body.item[0];

      return {
        newItemId: newItem && newItem.giftListItemID,
        favoritedCount: newItem && newItem.counter,
      };
    })
    .catch(err => {
      console.log('err', err);
    });
};

export default addItemToWishlist;
