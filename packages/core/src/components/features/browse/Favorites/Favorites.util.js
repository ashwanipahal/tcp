import { AVAILABILITY } from './container/Favorites.constants';

const WISHLIST_FILTERS = {
  ALL: {
    displayName: 'lbl_fav_all',
    filterMethod: () => true,
  },
  AVAILABLE: {
    displayName: 'lbl_fav_available',
    filterMethod: item => item.itemInfo.availability === AVAILABILITY.OK,
  },
  SOLDOUT: {
    displayName: 'lbl_fav_soldOut',
    filterMethod: item => item.itemInfo.availability === AVAILABILITY.SOLDOUT,
  },
  PURCHASED: {
    displayName: 'lbl_fav_purchased',
    filterMethod: item => item.quantityPurchased > 0,
  },
};

const WISHLIST_SORTS = {
  UNSORTED: {
    displayName: 'lbl_fav_recentlyAdded',
    sortMethod: null,
  },
  PRICE_ASCENDING: {
    displayName: 'lbl_fav_priceLowHigh',
    sortMethod: (item1, item2) => item1.productInfo.offerPrice - item2.productInfo.offerPrice,
  },
  PRICE_DESCENDING: {
    displayName: 'lbl_fav_priceHighLow',
    sortMethod: (item1, item2) => item2.productInfo.offerPrice - item1.productInfo.offerPrice,
  },
  CLEARANCE: {
    displayName: 'lbl_fav_clearance',
    sortMethod: (item1, item2) =>
      (item1.miscInfo.clearanceItem ? 0 : 1) - (item2.miscInfo.clearanceItem ? 0 : 1),
  },
  NEW_ARRIVAL: {
    displayName: 'lbl_fav_newArrivals',
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
    displayName: Object.keys(labels).length
      ? labels[WISHLIST_SORTS[key].displayName]
      : WISHLIST_SORTS[key].displayName,
  }));

export function getNonEmptyFiltersList(items, labels) {
  return Object.keys(WISHLIST_FILTERS).map(key => ({
    id: key,
    displayName: Object.keys(labels).length
      ? labels[WISHLIST_FILTERS[key].displayName]
      : WISHLIST_FILTERS[key].displayName,
    facetName: 'display_group_uFilter',
    disabled: items.findIndex(WISHLIST_FILTERS[key].filterMethod) < 0,
  }));
}

export default getNonEmptyFiltersList;
