// import { createSelector } from 'reselect';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';

export const getAddedToBagData = state => {
  return state.AddedToBagReducer.get('itemInfo');
};

export const isOpenAddedToBag = state => {
  return state.AddedToBagReducer.get('isOpenAddedToBag');
};

export const getOrderItems = state => {
  return getCartOrderDetails(state) && getCartOrderDetails(state).get('orderItems');
};

export const filterItemObject = (arr, searchedValue) => {
  const filteredValue = arr.filter(value => {
    return value.getIn(['itemInfo', 'itemId']).toString() === searchedValue.orderItemId.toString();
  });
  return filteredValue.get(0);
};

export const getQuantityValue = state => {
  let quantity = '';
  const orderItems = getOrderItems(state);
  const lastAddedToBag = getAddedToBagData(state);
  if (orderItems && lastAddedToBag) {
    const lastAddedItem = filterItemObject(orderItems, lastAddedToBag);
    quantity = lastAddedItem.getIn(['itemInfo', 'quantity']);
  }

  return quantity;
};

export const getLabelsAddToActions = state => {
  const {
    bag: {
      addedToBag: { lbl_cta_viewBag: viewBag, lbl_cta_checkout: checkout },
    },
  } = state.Labels;
  return {
    viewBag,
    checkout,
  };
};

const getOrderItemsDetails = state => {
  return state.get('orderItems');
};

export const getPointsSummary = (getOrderPointsSummary, lastAddedToBag) => {
  const orderItems = getOrderItemsDetails(getOrderPointsSummary);
  let pointsSummary = {};
  if (orderItems) {
    const lastAddedItem = filterItemObject(orderItems, lastAddedToBag);
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
