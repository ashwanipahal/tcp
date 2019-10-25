import { createSelector } from 'reselect';
import { generateGroups } from './ProductListing.util';
import { getAPIConfig, flattenArray } from '../../../../../utils';
import {
  PRODUCTLISTINGPAGE_REDUCER_KEY,
  PRODUCT_LISTING_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';
import { PRODUCTS_PER_LOAD } from './ProductListing.constants';
import { FACETS_FIELD_KEY } from '../../../../../services/abstractors/productListing/productListing.utils';

const getReducer = state => state[PRODUCTLISTINGPAGE_REDUCER_KEY];

const getProductListingState = state => {
  return state[PRODUCT_LISTING_REDUCER_KEY];
};

const getPlpProducts = state => getReducer(state).products;

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
  getProductListingState,
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
  getProductListingState,
  products => products && products.get('breadCrumbTrail')
);

export const getProductsSelect = createSelector(
  getProductListingState,
  products =>
    products && products.get('loadedProductsPages') && products.get('loadedProductsPages')[0]
);

export const getAllProductsSelect = createSelector(
  getProductListingState,
  products => {
    const allProducts = products && products.get('loadedProductsPages');
    return allProducts && flattenArray(allProducts);
  }
);

export const getLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.SLP;
};

export const getTotalProductsCount = createSelector(
  getProductListingState,
  products => products && products.get('totalProductsCount')
);

export const getAppliedFilters = createSelector(
  getProductListingState,
  products => products && products.get('appliedFiltersIds')
);

export const getAppliedSortId = createSelector(
  getProductListingState,
  products => products && products.get('appliedSortId')
);

export const getLoadedProductsCount = createSelector(
  getProductListingState,
  products => {
    const allProducts = products && products.get('loadedProductsPages');
    const totalProductCount =
      (allProducts && allProducts.reduce((sum, item) => item.length + sum, 0)) || 0;
    return totalProductCount || 0;
  }
);

export const getLongDescription = createSelector(
  getProductListingState,
  ProductListing => ProductListing && ProductListing.get('currentListingDescription')
);

export const getUnbxdId = createSelector(
  getProductListingState,
  products => products && products.get('unbxdId')
);

export const getLoadedProductsPages = createSelector(
  getProductListingState,
  products => products && products.get('loadedProductsPages')
);

export const getProductsFilters = createSelector(
  getProductListingState,
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

export const getLabelsAccountOverView = state => {
  if (!state.Labels || !state.Labels.account)
    return {
      logIn: {},
    };
  const {
    account: {
      accountOverview: { lbl_overview_login_text: logIn },
    },
  } = state.Labels;

  return {
    logIn,
  };
};

export const getIsLoadingMore = state => {
  return state.ProductListing.get('isLoadingMore');
};

export const getScrollToTopValue = state => {
  return state.ProductListing.get('isScrollToTop');
};

export const getProductsInCurrCategory = state => {
  return state.ProductListing.get('productsInCurrCategory');
};

export const getSpotlightReviewsUrl = () => {
  return getAPIConfig().BAZAARVOICE_SPOTLIGHT;
};

export const getBazaarvoiceApiUrl = () => {
  return getAPIConfig().BAZAARVOICE_REVIEWS;
};

export const getCategoryId = state => {
  const currentNavigationIds =
    state.ProductListing && state.ProductListing.get('currentNavigationIds');
  return currentNavigationIds && currentNavigationIds[currentNavigationIds.length - 1];
};

export default getPlpProducts;

const getPageSize = () => {
  return PRODUCTS_PER_LOAD;
};

export const getLastLoadedPageNumber = state => {
  // note that we do not assume all pages have the same size, to protect against BE returning less products then requested.
  return Math.ceil(getLoadedProductsCount(state) / getPageSize());
};

export const getMaxPageNumber = state => {
  // We no longer need to divide by page size because UNBXD start parameter matches the direct number of results.
  return Math.ceil(state.ProductListing.get('totalProductsCount') / getPageSize());
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

export const getIsFilterBy = state => {
  const filterMaps = state.ProductListing.get('filtersMaps');
  const filterKeys =
    filterMaps && filterMaps.unbxdDisplayName && Object.keys(filterMaps.unbxdDisplayName);
  return (
    filterKeys &&
    filterKeys
      .filter(filter => {
        return filter !== FACETS_FIELD_KEY.aux_color_unbxd;
      })
      .some(facets => {
        return filterMaps[facets].length > 0;
      })
  );
};

export const getIsDataLoading = state => {
  return state.ProductListing.get('isDataLoading');
};
