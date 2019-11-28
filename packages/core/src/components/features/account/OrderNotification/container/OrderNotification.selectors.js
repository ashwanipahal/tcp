import { createSelector } from 'reselect';
import { getOrdersListState } from '../../Orders/container/Orders.selectors';

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
  state =>
    state && state.orders && state.orders.length > 0
      ? state.orders.find(order => order.isBOSSOrder)
      : null
);

export const getLastBopis = createSelector(
  getOrdersListState,
  state =>
    state && state.orders && state.orders.length > 0
      ? state.orders.find(order => !order.isEcomOrder && !order.isBOSSOrder)
      : null
);

export const getLimitToDisplayLastOrderNotification = state => {
  return state.session.siteDetails.ORDER_THRESHOLD || 6;
};

export const getLimitToDisplayBossOrder = state => {
  return state.session.siteDetails.BOSS_ORDER_NOTIFICATION || 15;
};

export const getTransactionNotificationsInMyAccountEnabled = state => {
  return state.session.siteDetails.TRANS_NOTIFICATIONS_MY_ACCOUNT_ENABLED || true;
};
