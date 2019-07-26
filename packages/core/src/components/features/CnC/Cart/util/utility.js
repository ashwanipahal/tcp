export default getOrderPointsSummary => {
  let pointsSummary = {};
  if (getOrderPointsSummary.orderItems) {
    const {
      orderItems,
      pointsToNextReward,
      estimatedRewards,
      totalItems,
      bagSubTotal,
    } = getOrderPointsSummary;
    pointsSummary = {
      itemPrice:
        (orderItems[0] && orderItems[0].itemInfo && orderItems[0].itemInfo.offerPrice) || 0,
      itemPoints:
        (orderItems[0] && orderItems[0].itemInfo && orderItems[0].itemInfo.itemPoints) || 0,
      pointsToNextReward,
      userPoints: estimatedRewards || 0,
      bagSubTotal: bagSubTotal.toFixed(2),
      totalItems: totalItems || 0,
    };
  }
  return pointsSummary;
};
