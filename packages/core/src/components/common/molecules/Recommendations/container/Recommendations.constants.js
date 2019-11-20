import { RECOMMENDATIONS_ACTION_PATTERN } from '../../../../../constants/reducer.constants';

export const FETCH_RECOMMENDATIONS_DATA = `${RECOMMENDATIONS_ACTION_PATTERN}FETCH_RECOMMENDATIONS_DATA`;
export const LOAD_RECOMMENDATIONS_DATA = `${RECOMMENDATIONS_ACTION_PATTERN}LOAD_RECOMMENDATIONS_DATA`;
export const RECOMMENDATIONS_PAGES_MAPPING = {
  PDP: 'pdp',
  BAG: 'cart',
  HOMEPAGE: 'homepage',
  PLP: 'plp',
  FAVORITES: 'favorites',
  DEPARTMENT_LANDING: '', // TODO
  CHECKOUT: 'checkout',
  OUTFIT: 'outfit',
  NO_PAGE_FOUND: '404_page',
  SEARCH: 'search',
  NULL_SEARCH: '', // Please use null_search key in case of having proper data
  COLLECTION: '', // collection key in not available
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
