// import { createSelector } from 'reselect';
import { PRODUCTLISTINGPAGE_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getReducer = state => state[PRODUCTLISTINGPAGE_REDUCER_KEY];

const getPlpProducts = state => getReducer(state).products;

export const giftCardProducts = state => getReducer(state).giftCardProducts;

// const getExpensivePlpProducts = createSelector(
//   [getPlpProducts],
//   products => products.filter(p => p.min_list_price > 25)
// );

export default getPlpProducts;
