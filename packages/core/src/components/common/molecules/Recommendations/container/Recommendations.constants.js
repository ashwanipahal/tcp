import { RECOMMENDATIONS_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

export const FETCH_RECOMMENDATIONS_DATA = `${RECOMMENDATIONS_ACTION_PATTERN}FETCH_RECOMMENDATIONS_DATA`;
export const LOAD_RECOMMENDATIONS_DATA = `${RECOMMENDATIONS_ACTION_PATTERN}LOAD_RECOMMENDATIONS_DATA`;
export const RECOMMENDATIONS_PAGES_MAPPING = {
  PDP: 'pdp',
  BAG: 'cart',
  HOMEPAGE: 'homepage',
  PLP: 'plp',
  FAVORITES: 'favorites',
  DEPARTMENT_LANDING: '', // TODO Please use dpl key in case of having proper data
  CHECKOUT: 'checkout',
  OUTFIT: 'outfit',
  NO_PAGE_FOUND: '404_page',
  SEARCH: 'search',
  NULL_SEARCH: '', // TODO Please use null_search key in case of having proper data
  COLLECTION: '', // TODO collection key is not available
  NO_FAVORITES: '', // TODO no_favorites page key is not available
};
export const RECOMMENDATIONS_MBOXNAMES = {
  RECENTLY_VIEWED: 'recently-viewed-products',
};
export default {
  FETCH_RECOMMENDATIONS_DATA,
  LOAD_RECOMMENDATIONS_DATA,
  RECOMMENDATIONS_PAGES_MAPPING,
  RECOMMENDATIONS_MBOXNAMES,
};
