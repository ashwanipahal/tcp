import { AVAILABILITY } from './container/Favorites.constants';

const WISHLIST_FILTERS = {
  ALL: {
    displayName: 'all',
    filterMethod: () => true,
  },
  AVAILABLE: {
    displayName: 'available',
    filterMethod: item => item.itemInfo.availability === AVAILABILITY.OK,
  },
  SOLDOUT: {
    displayName: 'soldOut',
    filterMethod: item => item.itemInfo.availability === AVAILABILITY.SOLDOUT,
  },
  PURCHASED: {
    displayName: 'purchased',
    filterMethod: item => item.quantityPurchased > 0,
  },
};

const WISHLIST_SORTS = {
  UNSORTED: {
    displayName: 'recentlyAdded',
    sortMethod: null,
  },
  PRICE_ASCENDING: {
    displayName: 'price_Low_High',
    sortMethod: (item1, item2) => item1.productInfo.offerPrice - item2.productInfo.offerPrice,
  },
  PRICE_DESCENDING: {
    displayName: 'price_HighLow',
    sortMethod: (item1, item2) => item2.productInfo.offerPrice - item1.productInfo.offerPrice,
  },
  CLEARANCE: {
    displayName: 'clearance',
    sortMethod: (item1, item2) =>
      (item1.miscInfo.clearanceItem ? 0 : 1) - (item2.miscInfo.clearanceItem ? 0 : 1),
  },
  NEW_ARRIVAL: {
    displayName: 'new_Arrivals',
    sortMethod: (item1, item2) =>
      (item1.miscInfo.newArrivalItem ? 0 : 1) - (item2.miscInfo.newArrivalItem ? 0 : 1),
  },
};

export const getVisibleWishlistItems = (items, filterId, sortId) => {
  const filteredItems = items.filter(WISHLIST_FILTERS[filterId || 'ALL'].filterMethod);
  const { sortMethod } = WISHLIST_SORTS[sortId || 'UNSORTED'];
  return sortMethod ? filteredItems.sort(sortMethod) : filteredItems;
};

export const getSortsList = labels =>
  Object.keys(WISHLIST_SORTS).map(key => ({
    id: key,
    displayName: labels.WISHLIST_SORTS[key].displayName || WISHLIST_SORTS[key].displayName,
  }));

export function getNonEmptyFiltersList(items, labels) {
  return Object.keys(WISHLIST_FILTERS).map(key => ({
    id: key,
    displayName: labels.WISHLIST_FILTERS[key].displayName || WISHLIST_FILTERS[key].displayName,
    facetName: 'display_group_uFilter',
    disabled: items.findIndex(WISHLIST_FILTERS[key].filterMethod) < 0,
  }));
}

export default getNonEmptyFiltersList;
