/* eslint-disable extra-rules/no-commented-out-code */
import { PRODUCTLISTINGPAGE_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getReducer = state => state[PRODUCTLISTINGPAGE_REDUCER_KEY];

const getPlpProducts = state => getReducer(state).products;

export const giftCardProducts = state => getReducer(state).giftCardProducts;

// Organized Navigation Tree
const generateGroups = level1 => {
  try {
    let level2Groups = [];
    const groupings = {};

    // for each L2 parse and place in proper group
    if (level1.subCategories.Categories) {
      level1.subCategories.Categories.forEach(L2 => {
        const groupName = 'Categories';
        const groupOrder = 1;

        // if new grouping initalize array
        if (!groupings[groupName]) {
          groupings[groupName] = {
            order: groupOrder,
            menuItems: [],
          };
        }

        // Push L2 in this bucket
        groupings[groupName].menuItems.push(L2);
      });
    }

    // Now get all groups and generate array of object, this is not to bad as there are at most 3-4 groups
    level2Groups = Object.keys(groupings).map(group => ({
      groupName: group,
      order: groupings[group].order,
      menuItems: groupings[group].menuItems,
    }));

    return level2Groups.sort((prevGroup, curGroup) => {
      return prevGroup.order - curGroup.order;
    });
  } catch (error) {
    console.error('getHeaderNavigationTree:generateGroups', error);
    return [];
  }
};

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
