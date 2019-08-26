import { fromJS } from 'immutable';
import AIRMILES_BANNER_CONSTANTS from '../AirmilesBanner.constants';

// @flow

const initialState = fromJS({
  error: null,
  onAddAirmilesBanner: false,
});

type Action = {
  payload: {},
  type: string,
};

const AirmilesBannerReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_REQUEST:
      return state.set('onAddAirmilesBanner', true);
    case AIRMILES_BANNER_CONSTANTS.ADD_AIRMILES_BANNER_FAILED:
      return state.set('error', action.payload).set('onAddAirmilesBanner', false);

    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AirmilesBannerReducer;
