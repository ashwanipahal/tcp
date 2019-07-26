/* eslint-disable no-restricted-syntax */
/* eslint-disable complexity */

import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const flatCurrencyToCents = currency => {
  try {
    return parseFloat(parseFloat(currency.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]).toFixed(2));
  } catch (e) {
    throw new Error(e);
  }
};

export const getOrderPointSummary = orderDetailsResponse => {
  const usersOrder = {
    orderId: orderDetailsResponse.parentOrderId,
    giftWrappingTotal: 0,
    giftCardsTotal: flatCurrencyToCents(orderDetailsResponse.totalGiftCardAmount || 0),
    grandTotal: flatCurrencyToCents(orderDetailsResponse.grandTotal),
    estimatedRewards:
      orderDetailsResponse.userPoints && Math.round(orderDetailsResponse.userPoints),
    estimatedAirMiles: 0, // NOT IN SERVICE RESPONSE - - - Math.round(orderDetailsResponse.airMiles || 0),
    earnedReward: orderDetailsResponse.earnedReward || '',
    pointsToNextReward: orderDetailsResponse.pointsToNextReward || 0,
    orderItems: [],
  };

  for (const item of orderDetailsResponse.orderItems) {
    const sizeAndFit = item.productInfo.itemsAttributes[item.itemCatentryId.toString()];
    // When brierley fails, backend returns -1
    if (item.itemPoints === -1) {
      item.itemPoints = null;
    }

    usersOrder.orderItems.push({
      productInfo: {
        //  product part number for Unbxd API call
        size: sizeAndFit ? sizeAndFit.TCPSize : item.itemUnitDstPrice, // giftCard Size is its price
        fit: sizeAndFit ? sizeAndFit.TCPFit : null, // no fit for gift cards
        pdpUrl: item.productUrl.replace(/&amp;/g, '&'),
        // added to read type of order for the item
        orderType: item.orderItemType,
      },
      itemInfo: {
        itemId: item.orderItemId.toString(),
        itemPoints: item.itemPoints || item.itemPoints === 0 ? parseInt(item.itemPoints, 10) : null,
        // This code is misleading - itemPrice and itemDstPrice are not equal to list price/offer price
        // Backend returns the same value for both itemPrice and itemDstPrice UNLESS an explicit promotion is applied
        // Enhancement needed - Backend should return the actual prices and frontend should determine which values to display
        itemPrice: flatCurrencyToCents(item.itemPrice),
        offerPrice: flatCurrencyToCents(item.itemDstPrice),
        wasPrice: flatCurrencyToCents(item.productInfo.listPrice),
      },
    });
  }
  return usersOrder;
};

export const getOrderDetailsData = () => {
  const payload = {
    webService: endpoints.getOrderDetails,
    header: {
      catalogId: 10551,
      storeId: 10151,
      calc: true,
      pageName: 'fullOrderInfo',
      langId: -1,
      recalculate: true,
    },
  };

  return executeStatefulAPICall(payload).then(res => {
    if (!res.body) {
      throw new Error('res body is null');
      // TODO - Set API Helper to filter if error exists in response
    }

    const orderDetailsResponse = res.body;
    const orderDetails = getOrderPointSummary(orderDetailsResponse);
    return {
      orderDetails,
    };
  });
};

export default {
  getOrderDetailsData,
};
