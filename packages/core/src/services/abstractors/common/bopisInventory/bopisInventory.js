import { executeStatefulAPICall } from '../../../handler';
import endpoints from '../../../endpoints';

const ORDER_ITEM_TYPE = {
  BOSS: 'BOSS',
  BOPIS: 'BOPIS',
  ECOM: 'ECOM',
};

/**
 * @function getBopisInventoryDetails
 * @summary This API is used get the BOPIS inventory on load of mini bag drawer or my bag page.
 * @param {String[]} storeIds - List of storeIds present in the cart.
 * @param {String[]} variantNumbers - List of variantNumbers for BOPIS items present in the cart.
 * @return {Object[]} Each object contains the inventory count and status for BOPIs items in the cart.
 * @example  getBopisInventoryDetails().then((res) =>
 * console.log(res);
 * [
      {
        variantNo: '1111',
        quantity: 0,
        status: 'In Stock'
      }
    ]
  );
  */
const getBopisInventoryDetails = cartItems => {
  const bopisItems = cartItems
    .filter(item => !!item.miscInfo.store && item.productInfo.orderType === ORDER_ITEM_TYPE.BOPIS)
    .map(item => ({
      storeId: item.miscInfo.storeId.substring(2),
      variantNo: item.productInfo.variantNo,
      itemPartNumber: item.productInfo.itemPartNumber,
    }));

  if (!bopisItems.length) {
    return {};
  }
  const payload = {
    body: {
      availabilityRequest: {
        viewName: this.apiHelper.configOptions.isUSStore ? 'US BOPIS' : 'CA BOPIS',
        availabilityCriteria: {
          facilityNames: {
            facilityName: bopisItems.map(item => item.storeId),
          },
          itemNames: {
            itemName: bopisItems.map(item => item.variantNo),
          },
          attributeMapping: bopisItems.map(item => {
            return {
              variantNo: item.variantNo,
              itemPartNumber: item.itemPartNumber,
            };
          }),
        },
      },
    },
    webService: endpoints.getBOPISInventoryDetails,
  };

  return executeStatefulAPICall(payload)
    .then(res => {
      // if (this.apiHelper.responseContainsErrors(res)) {
      // TODO - handle error - throw new ServiceResponseError(res);
      // }

      const backendResults =
        (res.body &&
          res.body.availabilityDetail &&
          Array.isArray(res.body.availabilityDetail) &&
          res.body.availabilityDetail.map(item => {
            return {
              variantNo: item.itemName.toString(),
              quantity: item.atcQuantity,
              status: item.atcStatus,
              storeId: item.facilityName.toString(),
            };
          })) ||
        [];

      // Backend sends alot of extra data #Shocker, so we filter it out here given the data we sent them as the filter function
      return backendResults.filter(backendResult => {
        return bopisItems.find(
          item =>
            item.variantNo === backendResult.variantNo && item.storeId === backendResult.storeId
        );
      });
    })
    .catch(err => {
      console.log('err', err);
    });
};

export default getBopisInventoryDetails;
