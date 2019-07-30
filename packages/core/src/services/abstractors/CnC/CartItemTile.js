/* eslint-disable no-restricted-syntax */
/* eslint-disable complexity */

import { executeStatefulAPICall } from '../../handler';
import endpoints from '../../endpoints';

export const flatCurrencyToCents = currency => {
  try {
    return parseFloat(currency).toFixed(2);
    // return parseFloat(parseFloat(currency.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]).toFixed(2));
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
    earnedReward: orderDetailsResponse.earnedReward || '',
    pointsToNextReward: orderDetailsResponse.pointsToNextReward || 0,
    orderItems: [],
    totalItems: 0,
    bagSubTotal:
      parseFloat(orderDetailsResponse.grandTotal) -
      parseFloat(orderDetailsResponse.totalGiftCardAmount),
  };

  for (const item of orderDetailsResponse.orderItems) {
    // When brierley fails, backend returns -1
    if (item.itemPoints === -1) {
      item.itemPoints = null;
    }
    if (!item.giftOptions) {
      usersOrder.totalItems += parseInt(item.qty, 10);
      usersOrder.orderItems.push({
        itemInfo: {
          itemId: item.orderItemId.toString(),
          itemPoints:
            item.itemPoints || item.itemPoints === 0 ? parseInt(item.itemPoints, 10) : null,
          itemPrice: flatCurrencyToCents(item.itemPrice),
          offerPrice: flatCurrencyToCents(item.itemDstPrice),
        },
      });
    }
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
