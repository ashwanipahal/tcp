import { createSelector } from 'reselect';
import {
  ORDERS_REDUCER_KEY,
  APICONFIG_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';

const getState = state => state[ORDERS_REDUCER_KEY];

/**
 * Selector function to return redux error
 * @param { object } state reduxStore state
 */
export const getOrdersListState = createSelector(
  getState,
  state => state && state.get('ordersList')
);

export const getLabels = state => state.Labels.global;

export const getLastSTHOrder = createSelector(
  getOrdersListState,
  state =>
    state && state.orders && state.orders.length > 0
      ? state.orders.find(order => order.isEcomOrder)
      : null
);

export const getLastBoss = createSelector(
  getOrdersListState,
  state => (state.orders.length > 0 ? state.orders.find(order => order.isBOSSOrder) : null)
);

export const getLastBopis = createSelector(
  getOrdersListState,
  state =>
    state.orders.length > 0
      ? state.orders.find(order => !order.isEcomOrder && !order.isBOSSOrder)
      : null
);

export const getLimitToDisplayLastOrderNotification = state => {
  return state[APICONFIG_REDUCER_KEY].ordersNotificationsThreshold || 30; // Todo : need to change
};

export const getLimitToDisplayBossOrder = state => {
  return state[APICONFIG_REDUCER_KEY].bossOrdersNotificationsThreshold || 30; // Todo : need to change
};

export const getTransactionNotificationsInMyAccountEnabled = state => {
  return state[APICONFIG_REDUCER_KEY].isTransactionNotificationsInMyAccountEnabled || true; // Todo : need to change
};
