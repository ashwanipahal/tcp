import { createSelector } from 'reselect';
import { ORDERS_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getState = state => state[ORDERS_REDUCER_KEY];

/**
 * Selector function to return redux error
 * @param { object } state reduxStore state
 */
export const getOrdersListState = createSelector(
  getState,
  state => state && state.get('ordersList')
);

/**
 * Selector function to return redux label
 * @param { object } state reduxStore state
 */
export const getLabels = state => state.Labels.account;
