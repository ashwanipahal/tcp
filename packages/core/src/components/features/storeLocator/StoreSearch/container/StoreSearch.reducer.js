import { fromJS } from 'immutable';
import constants from './StoreSearch.constants';

const initialState = fromJS({});

// TBD: Update reducers for container components with contextual ones
const StoreSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.STORE_SEARCH_TEST_ACTION_ONE:
      return state.set('action_one', action.payload);
    case constants.STORE_SEARCH_TEST_ACTION_TWO:
      return state.set('action_two', action.payload);
    default:
      return state;
  }
};

export default StoreSearchReducer;
