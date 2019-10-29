import { createSelector } from 'reselect';
import { ORDERDETAILS_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

const getState = state => state[ORDERDETAILS_REDUCER_KEY];

export const getOrdersLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.orders;
};

export const getOrderDetailsDataState = createSelector(
  getState,
  state => state && state.orderDetailsData
);

export const getAllItems = createSelector(
  getOrderDetailsDataState,
  orderState => {
    const items = [];
    if (orderState) {
      if (orderState.purchasedItems && orderState.purchasedItems.length > 0) {
        orderState.purchasedItems.forEach(item => {
          items.push(...item.items);
        });
      }
      if (orderState.canceledItems && orderState.canceledItems.length > 0) {
        items.push(...orderState.canceledItems);
      }
      if (orderState.outOfStockItems && orderState.outOfStockItems.length > 0) {
        items.push(...orderState.outOfStockItems);
      }
    }
    return items;
  }
);
