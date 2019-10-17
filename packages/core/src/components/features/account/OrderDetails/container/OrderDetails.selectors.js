import { createSelector } from 'reselect';
import { ORDERDETAILS_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

const getState = state => state[ORDERDETAILS_REDUCER_KEY];

export const getOrdersLabels = state => {
  return state.Labels && state.Labels.account && state.Labels.account.orders;
};

export const getOrderId = (state, props) => {
  if (props.navigation) {
    return props.navigation.getParam('orderId') || false;
  }
  return (props.router && props.router.query && props.router.query.orderId) || false;
};
export const getOrderDetailsDataState = createSelector(
  getState,
  state => state && state.orderDetailsData
);
