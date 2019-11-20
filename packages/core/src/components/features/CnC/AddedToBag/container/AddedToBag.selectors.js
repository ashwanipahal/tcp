// import { createSelector } from 'reselect';
import { getLabelValue } from '@tcp/core/src/utils';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';

export const getAddedToBagLoaderState = state => {
  return state.PageLoader && state.PageLoader.addedToBagLoaderState;
};

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

export const filterItemObjectFromArray = (arr, searchedValue) => {
  const filteredData = [];
  let lastItemsData;
  if (typeof arr !== 'undefined') {
    lastItemsData = searchedValue.map(lastItem => {
      const filteredValue = arr.filter(value => {
        return (
          value.getIn(['itemInfo', 'itemId']) &&
          lastItem.orderItemId &&
          value.getIn(['itemInfo', 'itemId']).toString() === lastItem.orderItemId.toString()
        );
      });
      const filteredValueParam = filteredValue.get(0);
      filteredData.push({
        itemPrice: filteredValueParam ? filteredValueParam.getIn(['itemInfo', 'offerPrice']) : 0,
        itemPoints: filteredValueParam ? filteredValueParam.getIn(['itemInfo', 'itemPoints']) : 0,
        quantity: filteredValueParam ? filteredValueParam.getIn(['itemInfo', 'quantity']) : 0,
      });
      return filteredData;
    });
    return {
      filteredPrice: lastItemsData[0].reduce((a, b) => a + (b.itemPrice || 0), 0),
      filteredProductItemPoints: lastItemsData[0].reduce((a, b) => a + (b.itemPoints || 0), 0),
      filteredProductQuantity: lastItemsData[0].reduce((a, b) => a + (b.quantity || 0), 0),
    };
  }
  return {};
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

export const getAddedToBagInterval = state => {
  return state.session.siteDetails.ADDED_TO_BAG_MODAL_INTERVAL || 0;
};

export const getPointsSummary = (getOrderPointsSummary, lastAddedToBag) => {
  const orderItems = getOrderItemsDetails(getOrderPointsSummary);
  let pointsSummary = {};
  let lastAddedItem;
  let offerPrice;
  let productItemPoints;
  if (orderItems) {
    if (Array.isArray(lastAddedToBag)) {
      lastAddedItem = filterItemObjectFromArray(orderItems, lastAddedToBag);
      const { filteredPrice, filteredProductItemPoints } = lastAddedItem;
      offerPrice = filteredPrice;
      productItemPoints = filteredProductItemPoints;
    } else {
      lastAddedItem = filterItemObject(orderItems, lastAddedToBag);
      offerPrice = lastAddedItem && lastAddedItem.getIn(['itemInfo', 'offerPrice']);
      productItemPoints = lastAddedItem && lastAddedItem.getIn(['itemInfo', 'itemPoints']);
    }

    const obj = {
      pointsToNextReward: getOrderPointsSummary.get('pointsToNextReward'),
      estimatedRewards: getOrderPointsSummary.get('estimatedRewards'),
      totalItems: getOrderPointsSummary.get('totalItems'),
      grandTotal: getOrderPointsSummary.get('grandTotal'),
      giftCardsTotal: getOrderPointsSummary.get('giftCardsTotal'),
    };

    if (lastAddedItem && offerPrice > 0) {
      pointsSummary = {
        itemPrice: offerPrice,
        itemPoints: productItemPoints,
        pointsToNextReward: obj.pointsToNextReward,
        userPoints: obj.estimatedRewards || 0,
        bagSubTotal: obj.grandTotal - obj.giftCardsTotal || 0,
        totalItems: obj.totalItems || 0,
      };
    }
  }
  return pointsSummary;
};
