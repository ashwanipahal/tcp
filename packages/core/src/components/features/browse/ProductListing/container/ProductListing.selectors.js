/* eslint-disable extra-rules/no-commented-out-code */
import { PRODUCTLISTINGPAGE_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import { generateGroups } from './ProductListing.util';

const getReducer = state => state[PRODUCTLISTINGPAGE_REDUCER_KEY];

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
    // cachedOrganizedNavTree = organizedNav;
  }

  return organizedNav;
};

export const getNavigationTree = state => {
  // const currentListingIds = state.productListing.breadcrumbs.map(crumb => crumb.pathSuffix);
  const currentListingIds = state.ProductListing.currentNavigationIds;
  const navTree = getOrganizedHeaderNavigationTree(state);

  return (
    currentListingIds &&
    currentListingIds[0] &&
    navTree.find(L1 => L1.categoryId === currentListingIds[0])
  );
};

export default getPlpProducts;
