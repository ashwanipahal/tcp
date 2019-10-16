import { AVAILABILITY } from './container/Favorites.constants';

const WISHLIST_FILTERS = {
  'All': {
    displayName: 'All',
    filterMethod: () => true,
  },
  AVAILABLE: {
    displayName: 'Available',
    filterMethod: (item) => item.itemInfo.availability === AVAILABILITY.OK,
  },
  SOLDOUT: {
    displayName: 'Sold Out',
    filterMethod: (item) => item.itemInfo.availability === AVAILABILITY.SOLDOUT,
  },
  PURCHASED: {
    displayName: 'Purchased',
    filterMethod: (item) => item.quantityPurchased > 0
  }
};

export function getNonEmptyFiltersList (items, labels) {
  return Object.keys(WISHLIST_FILTERS).map(key => ({
    id: key,
    displayName: WISHLIST_FILTERS[key].displayName || labels.key,
    facetName: "age_group_uFilter"
    // disabled: items.findIndex(WISHLIST_FILTERS[key].filterMethod) < 0
  }));
}

export default getNonEmptyFiltersList;
