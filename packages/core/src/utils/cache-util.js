import { checkCacheValid, generateCacheTTL } from 'redux-cache';
import { select } from 'redux-saga/effects';
import { getReducerKeyByAction } from './redux-util';

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

function* validateCache(action, args) {
  const state = yield select();
  const getState = () => state;
  const reducerKey = getReducerKeyByAction(action.type);
  if (!reducerKey) return false;
  return checkCacheValid(getState, reducerKey, args);
}

/*
    setCacheTTL is over-riding generateCacheTTL to override default ttl.
    arguments:
    ttl - time to live which is by default DEFAULT_TTL_TIME
*/

const DEFAULT_TTL_TIME = 10 * 60 * 1000; // ttl is 10 mins by default

function setCacheTTL(ttl = DEFAULT_TTL_TIME) {
  return generateCacheTTL(ttl);
}

export { setCacheTTL, validateCache };
export {
  invalidateCache as invalidateReducerCache,
  cacheEnhancer as cacheEnhancerMiddleware,
  DEFAULT_KEY as DEFAULT_REDUCER_KEY,
} from 'redux-cache';
