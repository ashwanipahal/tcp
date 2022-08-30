import constants from '../MyComponent.constants';
import { test, testOne, testTwo } from '../MyComponent.actions';
// TBD: Update test cases with correct actions
describe('MyComponent Actions', () => {
  it('test should set correct action type', () => {
    expect(test().type).toBe(constants.MY_COMPONENT_TEST_ACTION);
  });

  it('testOne should set correct action type', () => {
    expect(testOne().type).toBe(constants.MY_COMPONENT_TEST_ACTION_ONE);
  });

  it('testTwo should set correct action type', () => {
    expect(testTwo().type).toBe(constants.MY_COMPONENT_TEST_ACTION_TWO);
  });
});
