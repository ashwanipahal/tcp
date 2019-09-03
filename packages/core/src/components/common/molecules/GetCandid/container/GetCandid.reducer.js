import { fromJS } from 'immutable';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

import CONSTANTS from './GetCandid.constants';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  candidData: null,
});

const GetCandidReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SET_DATA:
      return state.set('candidData', action.payload).set(DEFAULT_REDUCER_KEY, setCacheTTL());
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default GetCandidReducer;
