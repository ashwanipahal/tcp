import { checkCacheValid, generateCacheTTL } from 'redux-cache';
import { select } from 'redux-saga/effects';
import { getReducerKeyByAction } from './redux.util';
import { DEFAULT_REDUX_TTL_TIME } from '../config/site.config';

/*
   Redux cache is a library used to prevent api calls when correct data exists in redux already.
   It has a TTL based cache validation which defaults to 10 mins along with functionality of forcefully bursting a specific reducer cache.

   This utility over-rides the redux cache to provide as a wrapper for future.
   Idea is to use same cache utility for both redux and any other storage mechanism like local storage for api.
*/

/*
    validateCache is over-riding checkCacheValid to get State Object in itself and then validate the logic based
    arguments:
    action: - string - It is the action dispatched, which is needed to find the reducerKey (Reducer key - The key of the reducer to check whether the cache is still valid)
    args: object which might contain -
    cacheKey - string - default: DEFAULT_REDUCER_KEY. The cacheKey to be checking.
    accessStrategy - function - default: (state, reducerKey, cacheKey) => state[reducerKey][cacheKey]. Use this to overide the way in which the cacheKey is checked. This allows for greater configurability for applying the caching strategy to nested items in your reducer.
*/

function* validateCache(action) {
  const state = yield select();
  const getState = () => state;
  const reducerKey = getReducerKeyByAction(action.type);
  if (!reducerKey) return false;
  return checkCacheValid(getState, reducerKey, {
    accessStrategy: (s, rKey, cacheKey) => s[rKey].get(cacheKey),
  });
}

/*
    validateReduxCache is higher order function which limits to run the saga method only when cache in redux expires.
    This helps to prevent unnecessary API calls in SPA while switching between pages. For more info refer to Redux-Cache.

    To forcefully execute the method, ignoreCache should be passed in payload of that action.
    arguments:
    sagaMethod - Function - Saga function which is used to request data from API - It needs to run only when data in redux expires
*/

function validateReduxCache(sagaMethod) {
  function* cachedSagaMethod(action) {
    const isCacheValid = yield validateCache(action);
    const ignoreCacheValidity = action.payload && action.payload.ignoreCache;

    if (isCacheValid && !ignoreCacheValidity) {
      return null;
    }
    return yield sagaMethod();
  }
  return cachedSagaMethod;
}

/*
    setCacheTTL is over-riding generateCacheTTL to override default ttl.
    arguments:
    ttl - time to live which is by default DEFAULT_REDUX_TTL_TIME
*/

function setCacheTTL(ttl = DEFAULT_REDUX_TTL_TIME) {
  return generateCacheTTL(ttl);
}

export { setCacheTTL, validateReduxCache };
export {
  invalidateCache as invalidateReduxCache,
  cacheEnhancer as cacheEnhancerMiddleware,
  DEFAULT_KEY as DEFAULT_REDUCER_KEY,
} from 'redux-cache';
