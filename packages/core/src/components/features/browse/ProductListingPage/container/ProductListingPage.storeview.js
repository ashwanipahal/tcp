import { createSelector } from 'reselect';

const getPlpProducts = state => state.ProductListingPageReducer.products;

const getExpensivePlpProducts = createSelector(
  [getPlpProducts],
  products => products.filter(p => p.min_list_price > 25)
);

export default getExpensivePlpProducts;
