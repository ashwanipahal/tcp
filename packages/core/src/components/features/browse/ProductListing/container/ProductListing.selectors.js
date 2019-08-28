import { createSelector } from 'reselect';
import { generateGroups } from './ProductListing.util';
import {
  PRODUCTLISTINGPAGE_REDUCER_KEY,
  PRODUCT_LISTING_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';
import { PRODUCTS_PER_LOAD } from './ProductListing.constants';

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

  const organizedNav = unorganizedTree.map(L1 => {
    return {
      ...L1,
      menuGroupings: generateGroups(L1),
    };
  });

  // only on browser so we dont need to keep deriving this
  if (/* isClient() && */ organizedNav.length) {
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

export const getLoadedProductsCount = createSelector(
  getProductListingState,
  products => {
    const allProducts = products && products.get('loadedProductsPages');
    const totalProductCount =
      (allProducts && allProducts.reduce((sum, item) => item.length + sum, 0)) || 0;
    console.log('totalProductCount', totalProductCount);
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

export const getLabelsProductListing = state => {
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
  return state.ProductListing.get('isLoadingMore');
};

export default getPlpProducts;

const getPageSize = () => {
  return PRODUCTS_PER_LOAD;
};

export const getLastLoadedPageNumber = state => {
  // note that we do not assume all pages have the same size, to protect against BE returning less products then requested.
  return Math.ceil(getLoadedProductsCount(state) / getPageSize());
};
