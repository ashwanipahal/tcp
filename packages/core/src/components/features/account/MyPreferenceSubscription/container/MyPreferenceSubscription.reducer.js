import MY_PREFERENCE_CONSTANTS from '../MyPreferenceSubscription.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = {
  subscribeStoreData: null,
  [DEFAULT_REDUCER_KEY]: null,
};

const MyPreferenceSubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PREFERENCE_CONSTANTS.GET_SUBSCRIBE_STORE:
      return { ...state };
    case MY_PREFERENCE_CONSTANTS.SET_SUBSCRIBE_STORE:
      return {
        ...state,
        ...{
          subscribeStoreData: action.payload,
          [DEFAULT_REDUCER_KEY]: setCacheTTL(MY_PREFERENCE_CONSTANTS.GET_SUBSCRIBE_STORE_TTL),
        },
      };
    default:
      return state;
  }
};

export default MyPreferenceSubscriptionReducer;
