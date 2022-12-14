export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const PRODUCTS_URI = {
  PRODUCTS: 'products',
  PRODUCTS_BY_OUTFITS: 'tcpproduct/getProductsByOutfits',
  PRODUCTS_VIEW_BY_CATEGORY: 'category',
  PRODUCTS_BY_SEARCH: 'search',
  PRODUCTS_AUTOSUGGEST: 'autosuggest',
};

export const SAVE_FOR_LATER = 'v2/cart/saveForLater';

export const graphQLClient = 'graphQL';
export const defaultCountry = 'USA';
export const defaultBrand = 'TCP';
export const defaultChannel = 'Desktop';
export const MobileChannel = 'Mobile';

export default {
  API_METHODS,
  graphQLClient,
  defaultCountry,
  defaultBrand,
  defaultChannel,
  MobileChannel,
};
