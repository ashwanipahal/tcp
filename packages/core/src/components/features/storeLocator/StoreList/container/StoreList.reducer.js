import { fromJS } from 'immutable';
import { DEFAULT_REDUCER_KEY } from '../../../../../utils/cache.util';
import constants from './StoreList.constants';

export const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  storesSummaryListUS: [],
  storesSummaryListCA: [],
  storesSummaryListOthers: [],
});

// TBD: Update reducers for container components with contextual ones
const StoreListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_STORE_LIST: {
      const { id, stores } = action.payload;
      return state.set(`storesSummaryList${id}`, stores);
    }
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default StoreListReducer;
