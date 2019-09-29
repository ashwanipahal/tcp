import { createSelector } from 'reselect';
import { ORDERS_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getState = state => state[ORDERS_REDUCER_KEY];

/**
 * Selector function to return redux error
 * @param { object } state reduxStore state
 */
const getOrdersListState = createSelector(
  getState,
  state => state && state.get('ordersList')
);

export default getOrdersListState;
