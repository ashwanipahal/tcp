import CARTPAGE_CONSTANTS from '../CartItemTile.constants';
import CONSTANTS from '../../Checkout/Checkout.constants';

const getModifiedString = (labels, store, orderItemType, bossStartDate, bossEndDate) => {
  let modifiedString = '';
  if (orderItemType === 'BOPIS') {
    modifiedString = `${labels.bopisLabel.replace('#store#', `${store}`)}`;
  } else {
    let str = labels.bossLabel;
    const mapObj = {
      '#store#': store,
      '#startMonth#': bossStartDate.get('month'),
      '#startdate#': bossStartDate.get('date'),
      '#endMonth#': bossEndDate.get('month'),
      '#enddate#': bossEndDate.get('date'),
    };
    str = str.replace(/#store#|#startMonth#|#startdate#|#endMonth#|#enddate#/gi, matched => {
      return mapObj[matched];
    });
    modifiedString = str;
  }
  return modifiedString;
};

export const filterBopisProducts = orderItems => {
  return orderItems
    .filter(
      item =>
        !!item.miscInfo.store && item.productInfo.orderType === CONSTANTS.ORDER_ITEM_TYPE.BOPIS
    )
    .map(item => ({
      storeId: item.miscInfo.storeId.substring(2),
      variantNo: item.productInfo.variantNo,
      itemPartNumber: item.productInfo.itemPartNumber,
    }));
};

export const updateBopisInventory = (orderItems, bopisItemsInventory) => {
  return orderItems.map(item => {
    const bopisItem =
      bopisItemsInventory &&
      bopisItemsInventory.find(bopItem => item.productInfo.variantNo === bopItem.variantNo);
    let patchedItem = { ...item };
    if (bopisItem) {
      patchedItem = {
        ...item,
        miscInfo: {
          ...item.miscInfo,
          availability:
            bopisItem.quantity > 0
              ? CARTPAGE_CONSTANTS.AVAILABILITY.OK
              : CARTPAGE_CONSTANTS.AVAILABILITY.UNAVAILABLE,
        },
      };
    }
    return patchedItem;
  });
};

export default getModifiedString;
