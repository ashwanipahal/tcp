import { AVAILABILITY } from './container/Favorites.constants';

const WISHLIST_FILTERS = {
  ALL: {
    displayName: 'All',
    filterMethod: () => true,
  },
  AVAILABLE: {
    displayName: 'Available',
    filterMethod: item => item.itemInfo.availability === AVAILABILITY.OK,
  },
  SOLDOUT: {
    displayName: 'Sold Out',
    filterMethod: item => item.itemInfo.availability === AVAILABILITY.SOLDOUT,
  },
  PURCHASED: {
    displayName: 'Purchased',
    filterMethod: item => item.quantityPurchased > 0,
  },
};

const WISHLIST_SORTS = {
  UNSORTED: {
    displayName: 'RECENTLY ADDED',
    sortMethod: null,
  },
  PRICE_ASCENDING: {
    displayName: 'Price: Low to High',
    sortMethod: (item1, item2) => item1.productInfo.offerPrice - item2.productInfo.offerPrice,
  },
  PRICE_DESCENDING: {
    displayName: 'Price: High to Low',
    sortMethod: (item1, item2) => item2.productInfo.offerPrice - item1.productInfo.offerPrice,
  },
  CLEARANCE: {
    displayName: 'Clearance',
    sortMethod: (item1, item2) =>
      (item1.miscInfo.clearanceItem ? 0 : 1) - (item2.miscInfo.clearanceItem ? 0 : 1),
  },
  NEW_ARRIVAL: {
    displayName: 'New Arrivals',
    sortMethod: (item1, item2) =>
      (item1.miscInfo.newArrivalItem ? 0 : 1) - (item2.miscInfo.newArrivalItem ? 0 : 1),
  },
};

export const getVisibleWishlistItems = (items, filterId, sortId) => {
  const filteredItems = items.filter(WISHLIST_FILTERS[filterId || 'ALL'].filterMethod);
  const { sortMethod } = WISHLIST_SORTS[sortId || 'UNSORTED'];
  return sortMethod ? filteredItems.sort(sortMethod) : filteredItems;
};

const sortsList = Object.keys(WISHLIST_SORTS).map(key => ({
  id: key,
  displayName: WISHLIST_SORTS[key].displayName,
}));

export const getSortsList = () => sortsList;

export function getNonEmptyFiltersList(items, labels) {
  return Object.keys(WISHLIST_FILTERS).map(key => ({
    id: key,
    displayName: WISHLIST_FILTERS[key].displayName || labels.key,
    facetName: 'display_group_uFilter',
    disabled: items.findIndex(WISHLIST_FILTERS[key].filterMethod) < 0,
  }));
}

export default getNonEmptyFiltersList;
