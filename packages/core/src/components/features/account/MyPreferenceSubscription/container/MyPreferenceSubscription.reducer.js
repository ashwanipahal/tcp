import MY_PREFERENCE_CONSTANTS from '../MyPreferenceSubscription.constants';

const initialState = {
  subscribeStoreData: null,
};

const MyPreferenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PREFERENCE_CONSTANTS.GET_SUBSCRIBE_STORE:
      return { ...state };
    case MY_PREFERENCE_CONSTANTS.SET_SUBSCRIBE_STORE:
      return { ...state, ...{ subscribeStoreData: action.payload } };
    default:
      return state;
  }
};

export default MyPreferenceReducer;
