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
  getProductListingState,
  products => products && products.breadCrumbTrail
);

export const getSelectedFilter = createSelector(
  getProductListingState,
  products => products && products.selectedFilter
);

export const getProductsSelect = createSelector(
  getProductListingState,
  products => products && products.loadedProductsPages && products.loadedProductsPages[0]
);

export const getAllProductsSelect = createSelector(
  getProductListingState,
  products => {
    const allProducts = products && products.loadedProductsPages;
    return allProducts && flattenArray(allProducts);
  }
);

export const getLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.SLP;
};

export const getTotalProductsCount = createSelector(
  getProductListingState,
  products => products && products.totalProductsCount
);

export const getAppliedFilters = createSelector(
  getProductListingState,
  products => products && products.appliedFiltersIds
);

export const getAppliedSortId = createSelector(
  getProductListingState,
  products => products && products.appliedSortId
);

export const getLoadedProductsCount = createSelector(
  getProductListingState,
  products => {
    const allProducts = products && products.loadedProductsPages;
    const totalProductCount =
      (allProducts && allProducts.reduce((sum, item) => item && item.length + sum, 0)) || 0;
    return totalProductCount || 0;
  }
);

export const getLongDescription = createSelector(
  getProductListingState,
  ProductListing => ProductListing && ProductListing.currentListingDescription
);

export const getUnbxdId = createSelector(
  getProductListingState,
  products => products && products.unbxdId
);

export const getLoadedProductsPages = createSelector(
  getProductListingState,
  products => products && products.loadedProductsPages
);

export const getProductsFilters = createSelector(
  getProductListingState,
  products => products && (products.filtersMaps || {})
);
export const getLabelsProductListing = state => {
  if (!state.Labels || !state.Labels.PLP)
    return {
      addToBag: '',
      readMore: '',
      readLess: '',
      shopCollection: '',
    };
  const {
    PLP: {
      plpTiles: { lbl_add_to_bag: addToBag, lbl_plpTiles_shop_collection: shopCollection },
      seoText: { lbl_read_more: readMore, lbl_read_less: readLess },
    },
  } = state.Labels;

  return {
    addToBag,
    readMore,
    readLess,
    shopCollection,
  };
};

export const getLabelsOutOfStock = state => {
  if (!state.Labels || !state.Labels.Browse)
    return {
      browseCommon: {},
    };
  const {
    Browse: {
      browseCommon: {
        lbl_common_outOfStockCaps: outOfStockCaps,
        lbl_common_itemSoldOut: itemSoldOutMessage,
      },
    },
  } = state.Labels;

  return {
    outOfStockCaps,
    itemSoldOutMessage,
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
  return state.ProductListing.isLoadingMore;
};

export const getScrollToTopValue = state => {
  return state.ProductListing.isScrollToTop;
};

export const getModalState = state => {
  return state.ProductListing.isKeepModalOpen;
};

export const getProductsInCurrCategory = state => {
  return state.ProductListing.productsInCurrCategory;
};

export const getSpotlightReviewsUrl = () => {
  return getAPIConfig().BAZAARVOICE_SPOTLIGHT;
};

export const getBazaarvoiceApiUrl = () => {
  return getAPIConfig().BAZAARVOICE_REVIEWS;
};

export const getCategoryId = state => {
  const currentNavigationIds = state.ProductListing && state.ProductListing.currentNavigationIds;
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
  return Math.ceil(state.ProductListing.totalProductsCount / getPageSize());
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

export const isFiltersAvailable = filterMaps => {
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

export const getIsFilterBy = state => {
  const filterMaps = state.ProductListing.filtersMaps;
  return isFiltersAvailable(filterMaps);
};

export const getIsDataLoading = state => {
  return state.ProductListing.isDataLoading;
};

const getTopPromosState = state => {
  const { productListingPage: { top: topPromos } = {} } = state.Layouts;
  return topPromos;
};

const getLoyaltyPromosState = state => {
  const { productListingPage: { loyalty: loyaltyPromo } = {} } = state.Layouts;
  return loyaltyPromo;
};

const getGridPromoState = state => {
  const { productListingPage: { grid: gridPromo } = {} } = state.Layouts;
  return gridPromo;
};

const getHorizontalPromoState = state => {
  const { productListingPage: { horizontal: horizontalPromo } = {} } = state.Layouts;
  return horizontalPromo;
};

const getModulesState = state => {
  return state.Modules;
};

export const getPLPTopPromos = createSelector(
  getTopPromosState,
  getLoyaltyPromosState,
  getModulesState,
  (topPromos, loyaltyPromo, modules) => {
    const loyaltyPromos =
      (loyaltyPromo &&
        loyaltyPromo.map(loyalPromo => {
          const loyalPromoModule = loyalPromo.contentId && modules[loyalPromo.contentId];
          if (loyalPromoModule) {
            loyalPromoModule.userType = loyalPromo.name;
          }
          return loyalPromoModule;
        })) ||
      [];

    const promos =
      (topPromos &&
        topPromos.map(promoItem => {
          return (promoItem.contentId && modules[promoItem.contentId]) || {};
        })) ||
      [];

    return loyaltyPromos.concat(promos);
  }
);

export const getPLPGridPromos = createSelector(
  getGridPromoState,
  getModulesState,
  (gridPromo, modules) => {
    return (
      (gridPromo &&
        gridPromo.map(promoItem => {
          const moduleInfo = (promoItem.contentId && modules[promoItem.contentId]) || {};
          return { ...moduleInfo, slot: promoItem && promoItem.name };
        })) ||
      []
    );
  }
);

export const getPlpHorizontalPromo = createSelector(
  getHorizontalPromoState,
  getModulesState,
  (horizontalPromo, modules) => {
    return (
      (horizontalPromo &&
        horizontalPromo.map(promoItem => {
          const horizontalModuleInfo = (promoItem.contentId && modules[promoItem.contentId]) || {};
          return { ...horizontalModuleInfo, slot: promoItem && promoItem.name };
        })) ||
      []
    );
  }
);
