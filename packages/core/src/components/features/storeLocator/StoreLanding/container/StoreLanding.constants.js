import { STORE_LOCATOR_ACTION_PATTERN } from '@tcp/core/src/constants/reducer.constants';

export default {
  SET_DEFAULT_STORE: `${STORE_LOCATOR_ACTION_PATTERN}SET_DEFAULT_STORE`,
  SET_GEO_DEFAULT_STORE: `${STORE_LOCATOR_ACTION_PATTERN}SET_GEO_DEFAULT_STORE`,
  GET_FAVORITE_STORE: `${STORE_LOCATOR_ACTION_PATTERN}GET_FAVORITE_STORE`,
  GET_LOCATION_STORES: `${STORE_LOCATOR_ACTION_PATTERN}GET_LOCATION_STORES`,
  STORES_SET_SUGGESTED_STORES: `${STORE_LOCATOR_ACTION_PATTERN}STORES_SET_SUGGESTED_STORES`,
  SET_FAVORITE_STORE: `${STORE_LOCATOR_ACTION_PATTERN}SET_FAVORITE_STORE`,
  INITIAL_STORE_LIMIT: 5,
  GOOGLE_SEARCH_API_ENDPOINT:
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=',
  FAV_STORE_CACHE_KEY: 'FAVOURITE_STORE_CACHE_KEY',
};
