import { createSelector } from 'reselect';
import { RECOMMENDATIONS_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getRecommendationsState = state => state[RECOMMENDATIONS_REDUCER_KEY];

export const getProducts = createSelector(
  getRecommendationsState,
  recommendations => recommendations.get('products')
);

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
