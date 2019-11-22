import { createSelector } from 'reselect';
import { generateGroups } from '../../ProductListing/container/ProductListing.util';
import { getAPIConfig, flattenArray, getLabelValue } from '../../../../../utils';
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
  products => products && products.currentNavigationIds
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
  products => products && products.breadCrumbTrail
);

export const getProductsSelect = createSelector(
  getSearchListingState,
  products => products && products.loadedProductsPages && products.loadedProductsPages[0]
);

export const getAllProductsSelect = createSelector(
  getSearchListingState,
  products => {
    const allProducts = products && products.loadedProductsPages;
    return allProducts && flattenArray(allProducts);
  }
);

export const getLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.SLP;
};

export const getTotalProductsCount = createSelector(
  getSearchListingState,
  products => products && products.totalProductsCount
);

export const getCurrentSearchForText = createSelector(
  getSearchListingState,
  products => products && products.currentListingSearchForText
);

export const getAppliedFilters = createSelector(
  getSearchListingState,
  products => products && products.appliedFiltersIds
);

export const getAppliedSortId = createSelector(
  getSearchListingState,
  products => products && products.appliedSortId
);

export const getLoadedProductsCount = createSelector(
  getSearchListingState,
  products => {
    const allProducts = products && products.loadedProductsPages;
    const totalProductCount =
      (allProducts && allProducts.reduce((sum, item) => item.length + sum, 0)) || 0;
    return totalProductCount || 0;
  }
);

export const getLongDescription = createSelector(
  getSearchListingState,
  ProductListing => ProductListing && ProductListing.currentListingDescription
);

export const getUnbxdId = createSelector(
  getSearchListingState,
  products => products && products.unbxdId
);

export const getLoadedProductsPages = createSelector(
  getSearchListingState,
  products => products && products.loadedProductsPages
);

export const getProductsFilters = createSelector(
  getSearchListingState,
  products => products && products.filtersMaps
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
  return state[SLP_PAGE_REDUCER_KEY].isLoadingMore;
};

export const getModalState = state => {
  return state[SLP_PAGE_REDUCER_KEY].isKeepModalOpen;
};

export const checkIfSearchResultsAvailable = state => {
  return state[SLP_PAGE_REDUCER_KEY].isSearchResultsAvailable;
};

export const getSpotlightReviewsUrl = () => {
  return getAPIConfig().BAZAARVOICE_SPOTLIGHT;
};

export const getCategoryId = state => {
  const currentNavigationIds = state.ProductListing && state.ProductListing.currentNavigationIds;
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
  return Math.ceil(state[SLP_PAGE_REDUCER_KEY].totalProductsCount / getPageSize());
};

/**
 * @function updateAppliedFiltersInState
 * matches filterMaps with appliedFilterIds
 * and updates isSelected state in filters
 *
 * @param {*} state
 * @returns
 */
export const updateAppliedFiltersInState = state => {
  const filters = getProductsFilters(state);
  const appliedFilters = getAppliedFilters(state);
  const filterEntries = (filters && Object.entries(filters)) || [];
  if (appliedFilters && Object.keys(appliedFilters).length) {
    filterEntries.map(filter => {
      const key = filter[0];
      const values = filter[1];
      const appliedFilterValue = appliedFilters[key] || [];
      if (!(values instanceof Array)) return values;

      // for all arrays in filters - update isSelected as true if it is present in appliedFilterIds
      values.map(value => {
        const isValueApplied = appliedFilterValue.filter(id => id === value.id).length > 0;
        const updatedValue = value;
        updatedValue.isSelected = isValueApplied;
        return updatedValue;
      });
      return values;
    });
  }

  return filters;
};

export const getScrollToTopValue = state => {
  return getSearchListingState(state).isScrollToTop;
};

export const getPDPLabels = state => {
  return {
    completeTheLook: getLabelValue(state.Labels, 'lbl_complete_the_look', 'PDP', 'Browse'),
    youMayAlsoLike: getLabelValue(state.Labels, 'lbl_you_may_also_like', 'PDP', 'Browse'),
    recentlyViewed: getLabelValue(state.Labels, 'lbl_recently_viewed', 'PDP', 'Browse'),
  };
};
