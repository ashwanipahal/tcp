import { filterActions } from 'redux-ignore';
import { REDUCER_ACTION_MAPPING } from '../constants/reducer.constants';

/**
@summary getReducerKeyByAction is used to get the key of reducer in redux-state by name of Action dispatched.
This is being used in cache.util to automatically derive which reducer will be validated for caching.
arguments:
@param {string} actionName - Name of the action dispatched
@returns {string} - key of the reducer
*/

export const getReducerKeyByAction = actionName => {
  let reducerKey = '';
  Object.keys(REDUCER_ACTION_MAPPING).every(key => {
    const actionPattern = REDUCER_ACTION_MAPPING[key];
    if (actionName.match(actionPattern)) {
      reducerKey = key;
      return false;
    }
    return true;
  });
  return reducerKey;
};

/**
@summary getActionPatternByReducerKey is used to get pattern of action names by the key of reducer in redux-state.
This is being used in createFilteredReducer method to automatically derive what action pattern needs to be filtered out for the provided reducer.
arguments:
@param {string} reducerName - key of the reducer in redux-state
@returns {string} - action pattern based on the reducer
*/

export const getActionPatternByReducerKey = reducerName => REDUCER_ACTION_MAPPING[reducerName];

/**
 * @summary getReducerKeyByAction is used to create a Higher order reducer to filter out actions not matching a certain action name pattern.
 * This method overrides the redux-ignore library's method to extend it for any reducer.
 * arguments
 * @param {string} reducer - Reducer to be filtered
 * @param {String} reducerKey - key of the reducer in redux-state
 * @returns {Function} Reducer Function with a Filter
 */

export const createFilteredReducer = (reducer, reducerKey) => {
  const pattern = getActionPatternByReducerKey(reducerKey);
  const filterReducerByAction = action => action.type.match(pattern);
  return filterActions(reducer, filterReducerByAction);
};
