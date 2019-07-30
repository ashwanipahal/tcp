const filterObject = (arr, searchedValue) => {
  const filteredValue = arr.filter(value => {
    return value.itemInfo.itemId.toString() === searchedValue.orderItemId.toString();
  });
  return filteredValue[0];
};

export default (getOrderPointsSummary, lastAddedToBag) => {
  let pointsSummary = {};
  if (getOrderPointsSummary.orderItems) {
    console.log('swsddsds', getOrderPointsSummary, lastAddedToBag);
    const lastAddedItem = filterObject(getOrderPointsSummary.orderItems, lastAddedToBag);
    console.log('dcsdcdec', lastAddedItem);
    const {
      pointsToNextReward,
      estimatedRewards,
      totalItems,
      grandTotal,
      giftCardsTotal,
    } = getOrderPointsSummary;

    if (lastAddedItem) {
      pointsSummary = {
        itemPrice: (lastAddedItem.itemInfo && lastAddedItem.itemInfo.offerPrice) || 0,
        itemPoints: (lastAddedItem.itemInfo && lastAddedItem.itemInfo.itemPoints) || 0,
        pointsToNextReward,
        userPoints: estimatedRewards || 0,
        bagSubTotal: grandTotal - giftCardsTotal || 0,
        totalItems: totalItems || 0,
      };
    }
  }
  return pointsSummary;
};
