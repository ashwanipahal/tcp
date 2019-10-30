import MY_PREFERENCE_CONSTANTS from '../MyPreferenceSubscription.constants';

const initialState = {
  subscribeStoreData: null,
  isFetching: false,
};

const MyPreferenceSubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PREFERENCE_CONSTANTS.GET_SUBSCRIBE_STORE:
      Object.assign({}, state, {
        isFetching: true,
      });

      return { ...state };
    case MY_PREFERENCE_CONSTANTS.SET_SUBSCRIBE_STORE:
      Object.assign({}, state, {
        isFetching: false,
      });
      return { ...state, ...{ subscribeStoreData: action.payload } };
    default:
      return state;
  }
};

export default MyPreferenceSubscriptionReducer;
