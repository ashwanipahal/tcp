import constants from './MyComponent.constants';

// TBD: Update actions for container components with contextual ones
export const test = payload => ({
  type: constants.MY_COMPONENT_TEST_ACTION,
  payload,
});

export const testOne = payload => ({
  type: constants.MY_COMPONENT_TEST_ACTION_ONE,
  payload,
});

export const testTwo = payload => ({
  type: constants.MY_COMPONENT_TEST_ACTION_TWO,
  payload,
});
