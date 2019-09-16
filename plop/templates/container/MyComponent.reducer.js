import { fromJS } from 'immutable';
import constants from './MyComponent.constants';

const initialState = fromJS({});

// TBD: Update reducers for container components with contextual ones
const MyComponentReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.MY_COMPONENT_TEST_ACTION_ONE:
      return state.set('action_one', action.payload);
    case constants.MY_COMPONENT_TEST_ACTION_TWO:
      return state.set('action_two', action.payload);
    default:
      return state;
  }
};

export default MyComponentReducer;
