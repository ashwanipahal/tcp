import constants from '../StoreSearch.constants';
import { test, testOne, testTwo } from '../StoreSearch.actions';
// TBD: Update test cases with correct actions
describe('StoreSearch Actions', () => {
  it('test should set correct action type', () => {
    expect(test().type).toBe(constants.STORE_SEARCH_TEST_ACTION);
  });

  it('testOne should set correct action type', () => {
    expect(testOne().type).toBe(constants.STORE_SEARCH_TEST_ACTION_ONE);
  });

  it('testTwo should set correct action type', () => {
    expect(testTwo().type).toBe(constants.STORE_SEARCH_TEST_ACTION_TWO);
  });
});
