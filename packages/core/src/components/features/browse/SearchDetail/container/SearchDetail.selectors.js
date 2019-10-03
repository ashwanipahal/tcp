import { createSelector } from 'reselect';
import { generateGroups } from '../../ProductListing/container/ProductListing.util';
import { getAPIConfig, flattenArray } from '../../../../../utils';
import { PRODUCTS_PER_LOAD } from './SearchDetail.constants';
import { SLP_PAGE_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getReducer = state => state[SLP_PAGE_REDUCER_KEY];

const getSearchListingState = state => {
  return state[SLP_PAGE_REDUCER_KEY];
};

const getSlpProducts = state => getReducer(state).products;

export default getSlpProducts;

export const giftCardProducts = state => getReducer(state).giftCardProducts;

const getOrganizedHeaderNavigationTree = state => {
  const unorganizedTree = state.Navigation.navigationData;

  // Only in browser memory, will be cleaned on page re-fresh
  // if (cachedOrganizedNavTree) {
  //   return cachedOrganizedNavTree;
  // }

  const organizedNav =
    unorganizedTree &&
    unorganizedTree.map(L1 => {
      return {
        ...L1,
        menuGroupings: generateGroups(L1),
      };
    });

  // only on browser so we dont need to keep deriving this
  if (/* isClient() && */ organizedNav && organizedNav.length) {
    // TODO - fix this - cachedOrganizedNavTree = organizedNav;
  }

  return organizedNav;
};

export const getCurrentListingIds = createSelector(
  getSearchListingState,
  products => products && products.get('currentNavigationIds')
);

export const getNavigationTree = state => {
  // const currentListingIds = state.productListing.breadcrumbs.map(crumb => crumb.pathSuffix);
  const currentListingIds = getCurrentListingIds(state);
  const navTree = getOrganizedHeaderNavigationTree(state);
  return (
    currentListingIds &&
    currentListingIds[0] &&
    navTree &&
    navTree.find(L1 => L1.categoryId === currentListingIds[0])
  );
};

export const getBreadCrumbTrail = createSelector(
  getSearchListingState,
  products => products && products.get('breadCrumbTrail')
);

export const getProductsSelect = createSelector(
  getSearchListingState,
  products =>
    products && products.get('loadedProductsPages') && products.get('loadedProductsPages')[0]
);

export const getAllProductsSelect = createSelector(
  getSearchListingState,
  products => {
    const allProducts = products && products.get('loadedProductsPages');
    return allProducts && flattenArray(allProducts);
  }
);

export const getLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.SLP;
};

export const getTotalProductsCount = createSelector(
  getSearchListingState,
  products => products && products.get('totalProductsCount')
);

export const getCurrentSearchForText = createSelector(
  getSearchListingState,
  products => products && products.get('currentListingSearchForText')
);

export const getAppliedFilters = createSelector(
  getSearchListingState,
  products => products && products.get('appliedFiltersIds')
);

export const getAppliedSortId = createSelector(
  getSearchListingState,
  products => products && products.get('appliedSortId')
);

export const getLoadedProductsCount = createSelector(
  getSearchListingState,
  products => {
    const allProducts = products && products.get('loadedProductsPages');
    const totalProductCount =
      (allProducts && allProducts.reduce((sum, item) => item.length + sum, 0)) || 0;
    return totalProductCount || 0;
  }
);

export const getLongDescription = createSelector(
  getSearchListingState,
  ProductListing => ProductListing && ProductListing.get('currentListingDescription')
);

export const getUnbxdId = createSelector(
  getSearchListingState,
  products => products && products.get('unbxdId')
);

export const getLoadedProductsPages = createSelector(
  getSearchListingState,
  products => products && products.get('loadedProductsPages')
);

export const getProductsFilters = createSelector(
  getSearchListingState,
  products => products && products.get('filtersMaps')
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

export const getIsLoadingMore = state => {
  return state[SLP_PAGE_REDUCER_KEY].get('isLoadingMore');
};

export const checkIfSearchResultsAvailable = state => {
  return state[SLP_PAGE_REDUCER_KEY].get('isSearchResultsAvailable');
};

export const getSpotlightReviewsUrl = () => {
  return getAPIConfig().BAZAARVOICE_SPOTLIGHT;
};

export const getCategoryId = state => {
  const currentNavigationIds =
    state.ProductListing && state.ProductListing.get('currentNavigationIds');
  return currentNavigationIds && currentNavigationIds[currentNavigationIds.length - 1];
};

const getPageSize = () => {
  return PRODUCTS_PER_LOAD;
};

export const getLastLoadedPageNumber = state => {
  // note that we do not assume all pages have the same size, to protect against BE returning less products then requested.
  return Math.ceil(getLoadedProductsCount(state) / getPageSize());
};

export const getMaxPageNumber = state => {
  // We no longer need to divide by page size because UNBXD start parameter matches the direct number of results.
  return Math.ceil(state[SLP_PAGE_REDUCER_KEY].get('totalProductsCount') / getPageSize());
};
