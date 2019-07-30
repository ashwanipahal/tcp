const filterObject = (arr, searchedValue) => {
  const filteredValue = arr.filter(value => {
    return value.itemInfo.itemId.toString() === searchedValue.orderItemId.toString();
  });
  return filteredValue[0];
};

export default (getOrderPointsSummary, lastAddedToBag) => {
  let pointsSummary = {};
  if (getOrderPointsSummary.orderItems) {
    const lastAddedItem = filterObject(getOrderPointsSummary.orderItems, lastAddedToBag);
    const { pointsToNextReward, estimatedRewards, totalItems, bagSubTotal } = getOrderPointsSummary;
    if (lastAddedItem) {
      pointsSummary = {
        listPrice: (lastAddedItem.itemInfo && lastAddedItem.itemInfo.offerPrice) || 0,
        itemPoints: (lastAddedItem.itemInfo && lastAddedItem.itemInfo.itemPoints) || 0,
        pointsToNextReward,
        userPoints: estimatedRewards || 0,
        bagSubTotal: bagSubTotal.toFixed(2),
        totalItems: totalItems || 0,
      };
    }
  }
  return pointsSummary;
};
