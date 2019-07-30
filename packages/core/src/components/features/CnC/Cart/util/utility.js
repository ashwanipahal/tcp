export default getOrderPointsSummary => {
  let pointsSummary = {};
  if (getOrderPointsSummary.orderItems) {
    const {
      orderItems,
      pointsToNextReward,
      estimatedRewards,
      grandTotal = 0,
      giftCardsTotal = 0,
    } = getOrderPointsSummary;
    pointsSummary = {
      listPrice:
        (orderItems[0] && orderItems[0].itemInfo && orderItems[0].itemInfo.offerPrice) || 0,
      itemPoints:
        (orderItems[0] && orderItems[0].itemInfo && orderItems[0].itemInfo.itemPoints) || 0,
      pointsToNextReward,
      userPoints: estimatedRewards || 0,
      bagSubTotal: grandTotal - giftCardsTotal,
      totalItems: orderItems.length || 0,
    };
  }
  return pointsSummary;
};
