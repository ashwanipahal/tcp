import { createSelector } from 'reselect';
import { RECOMMENDATIONS_REDUCER_KEY } from '../../../../../constants/reducer.constants';

export const getProducts = (state, reduxKey) => {
  const recommendation = state[RECOMMENDATIONS_REDUCER_KEY];
  return recommendation && recommendation.get(reduxKey) && recommendation.get(reduxKey).products;
};

export const getLoadedProductsCount = createSelector(
  getProducts,
  products => products && products.length
);

export const getLabelsProductListing = state => {
  if (!state.Labels || !state.Labels.PLP)
    return {
      addToBag: {},
      readMore: {},
      readLess: {},
    };
  const {
    PLP: {
      plpTiles: { lbl_add_to_bag: addToBag },
      seoText: { lbl_read_more: readMore, lbl_read_less: readLess },
    },
  } = state.Labels;

  return {
    addToBag,
    readMore,
    readLess,
  };
};
