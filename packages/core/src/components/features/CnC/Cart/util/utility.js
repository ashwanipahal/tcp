export const filterObject = (arr, searchedValue) => {
  const filteredValue = arr.filter(value => {
    return value.getIn(['itemInfo', 'itemId']).toString() === searchedValue.orderItemId.toString();
  });
  return filteredValue.get(0);
};

const getOrderItems = state => {
  return state.get('orderItems');
};

export default (getOrderPointsSummary, lastAddedToBag) => {
  const orderItems = getOrderItems(getOrderPointsSummary);
  let pointsSummary = {};
  if (orderItems) {
    const lastAddedItem = filterObject(orderItems, lastAddedToBag);
    const obj = {
      pointsToNextReward: getOrderPointsSummary.get('pointsToNextReward'),
      estimatedRewards: getOrderPointsSummary.get('estimatedRewards'),
      totalItems: getOrderPointsSummary.get('totalItems'),
      grandTotal: getOrderPointsSummary.get('grandTotal'),
      giftCardsTotal: getOrderPointsSummary.get('giftCardsTotal'),
    };

    if (lastAddedItem) {
      pointsSummary = {
        itemPrice: lastAddedItem.getIn(['itemInfo', 'offerPrice']) || 0,
        itemPoints: lastAddedItem.getIn(['itemInfo', 'itemPoints']) || 0,
        pointsToNextReward: obj.pointsToNextReward,
        userPoints: obj.estimatedRewards || 0,
        bagSubTotal: obj.grandTotal - obj.giftCardsTotal || 0,
        totalItems: obj.totalItems || 0,
      };
    }
  }
  return pointsSummary;
};
