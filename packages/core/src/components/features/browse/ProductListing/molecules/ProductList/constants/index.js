/**
 * @module productListingStoreView
 * @author Gabriel Gomez
 */

export const SORT_OPTIONS_MAP_US = [
  { displayName: 'Recommended', id: '' }, // Default, no sort param required.
  { displayName: 'Price: High to Low', id: 'min_offer_price desc' },
  { displayName: 'Price: Low to High', id: 'min_offer_price asc' },
  { displayName: 'Newest', id: 'newest_score desc' },
  { displayName: 'Most Favorited', id: 'favoritedcount desc' },
  { displayName: 'Top Rated', id: 'TCPBazaarVoiceRating desc' },
];

export const SORT_OPTIONS_MAP_CA = [
  { displayName: 'Recommended', id: '' }, // Default, no sort param required.
  { displayName: 'Price: High to Low', id: 'min_offer_price desc' },
  { displayName: 'Price: Low to High', id: 'min_offer_price asc' },
  { displayName: 'Newest', id: 'newest_score desc' },
  { displayName: 'Most Favorited', id: 'favoritedcount desc' },
  { displayName: 'Top Rated', id: 'TCPBazaarVoiceRating desc' },
];

export const GRID_ITEMS_TYPES = {
  MARKETING: 'marketing',
  CONTAINED_MARKETING_ITEM: 'marketing_contained',
};
