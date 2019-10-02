import { createSelector } from 'reselect';
import { ORDERDETAILS_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

const getState = state => state[ORDERDETAILS_REDUCER_KEY];

export const getCommonLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.common;
};

export const getOrdersLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.orders;
};

export const getOrderDetailsDataState = createSelector(
  getState,
  state => state && state.get('orderDetailsData')
);
