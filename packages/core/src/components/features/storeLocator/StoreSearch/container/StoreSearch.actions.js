import constants from './StoreSearch.constants';

// TBD: Update actions for container components with contextual ones
export const test = payload => ({
  type: constants.STORE_SEARCH_TEST_ACTION,
  payload,
});

export const testOne = payload => ({
  type: constants.STORE_SEARCH_TEST_ACTION_ONE,
  payload,
});

export const testTwo = payload => ({
  type: constants.STORE_SEARCH_TEST_ACTION_TWO,
  payload,
});
