export default getOrderPointsSummary => {
  let pointsSummary = {};
  if (getOrderPointsSummary.orderItems) {
    const {
      orderItems,
      pointsToNextReward,
      userPoints,
      grandTotal = 0,
      giftCardsTotal = 0,
    } = getOrderPointsSummary;
    pointsSummary = {
      itemPrice: (orderItems[0] && orderItems[0].itemInfo && orderItems[0].itemInfo.itemPrice) || 0,
      itemPoints:
        (orderItems[0] && orderItems[0].itemInfo && orderItems[0].itemInfo.itemPoints) || 0,
      pointsToNextReward,
      userPoints: userPoints || 0,
      bagSubTotal: grandTotal - giftCardsTotal,
      totalItems: orderItems.length || 0,
    };
  }
  return pointsSummary;
};
