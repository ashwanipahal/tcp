import { createSelector } from 'reselect';
import { MY_PREFERENCE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

const getState = state => state[MY_PREFERENCE_REDUCER_KEY];

export const getPlaceRewardsSms = createSelector(
  getState,
  state => {
    if (state && state.subscribeStoreData && state.subscribeStoreData.CustomerPreferences) {
      const placeRewardsObject = {};
      state.subscribeStoreData.CustomerPreferences.map(itm => {
        placeRewardsObject[itm.preferenceMode] = itm.isModeSelected;
        return true;
      });
      return placeRewardsObject.placeRewardsSms || false;
    }
    return false;
  }
);

export const getGymPlaceRewardsSms = createSelector(
  getState,
  state => {
    if (state && state.subscribeStoreData && state.subscribeStoreData.CustomerPreferencesGym) {
      const placeRewardsGymObject = {};
      state.subscribeStoreData.CustomerPreferencesGym.map(itm => {
        placeRewardsGymObject[itm.preferenceMode] = itm.isModeSelected;
        return true;
      });
      return placeRewardsGymObject.placeRewardsSms || false;
    }
    return false;
  }
);

export const getSmsPhone = createSelector(
  getState,
  state => state && state.subscribeStoreData && state.subscribeStoreData.smsPhone
);

export const getGymSmsPhone = createSelector(
  getState,
  state => state && state.subscribeStoreData && state.subscribeStoreData.gymSmsPhone
);

export const getCustomerPreferences = createSelector(
  getState,
  state => state && state.subscribeStoreData
);

export const getSubscribeStoreFetchingState = createSelector(
  getState,
  state => state && state.subscribeStoreData && state.subscribeStoreData.isFetching
);
