// import { createSelector } from 'reselect';
import { getLabelValue } from '@tcp/core/src/utils';
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

export const getAddedToBagError = state => {
  return state.AddedToBagReducer.get('error');
};

export const getMultipleItemsAddedToBagError = state => {
  return state.AddedToBagReducer.get('multipleItemsError');
};

export const getAddedToPickupError = state => {
  return state.AddedToBagReducer.get('pickupError');
};

export const filterItemObject = (arr, searchedValue) => {
  const filteredValue = arr.filter(value => {
    return (
      value.getIn(['itemInfo', 'itemId']) &&
      searchedValue.orderItemId &&
      value.getIn(['itemInfo', 'itemId']).toString() === searchedValue.orderItemId.toString()
    );
  });
  return filteredValue.get(0);
};

export const getQuantityValue = state => {
  let quantity = '';
  const orderItems = getOrderItems(state);
  const lastAddedToBag = getAddedToBagData(state);
  if (orderItems && lastAddedToBag) {
    const lastAddedItem = filterItemObject(orderItems, lastAddedToBag);
    quantity = lastAddedItem && lastAddedItem.getIn(['itemInfo', 'quantity']);
  }

  return quantity;
};

export const getLabelsAddToActions = state => {
  return {
    viewBag: getLabelValue(state.Labels, 'lbl_cta_viewBag', 'addedToBagModal', 'global'),
    checkout: getLabelValue(state.Labels, 'lbl_cta_checkout', 'addedToBagModal', 'global'),
    continueCheckout: getLabelValue(
      state.Labels,
      'lbl_checkoutmodal_continueCheckout',
      'checkoutConfirmation',
      'global'
    ),
    confirmationText: getLabelValue(
      state.Labels,
      'lbl_checkoutmodal_confirmation',
      'checkoutConfirmation',
      'global'
    ),
    editConfirmationText: getLabelValue(
      state.Labels,
      'lbl_checkoutmodal_editConfirmation',
      'checkoutConfirmation',
      'global'
    ),
    backToBag: getLabelValue(
      state.Labels,
      'lbl_checkoutmodal_backToBag',
      'checkoutConfirmation',
      'global'
    ),
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
