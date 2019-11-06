import { createSelector } from 'reselect';
import { MY_PREFERENCE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

const getState = state => state[MY_PREFERENCE_REDUCER_KEY];

export const getCustomerPreferencesTcp = createSelector(
  getState,
  state => {
    if (state && state.subscribeStoreData && state.subscribeStoreData.CustomerPreferences) {
      const placeRewardsObject = {};
      state.subscribeStoreData.CustomerPreferences.map(itm => {
        placeRewardsObject[itm.preferenceMode] = itm.isModeSelected;
        return true;
      });
      return placeRewardsObject;
    }
    return false;
  }
);

export const getCustomerPreferencesGym = createSelector(
  getState,
  state => {
    if (state && state.subscribeStoreData && state.subscribeStoreData.CustomerPreferencesGym) {
      const placeRewardsGymObject = {};
      state.subscribeStoreData.CustomerPreferencesGym.map(itm => {
        placeRewardsGymObject[itm.preferenceMode] = itm.isModeSelected;
        return true;
      });
      return placeRewardsGymObject;
    }
    return false;
  }
);

export const getSmsPhone = createSelector(
  getState,
  state => state && state.subscribeStoreData && state.subscribeStoreData.smsPhone
);

export const getTcpSubscribe = createSelector(
  getCustomerPreferencesTcp,
  placeRewardsGymObject => placeRewardsGymObject && placeRewardsGymObject.placeRewardsSms
);

export const getTcpAppSubscribe = createSelector(
  getCustomerPreferencesTcp,
  placeRewardsGymObject => placeRewardsGymObject && placeRewardsGymObject.placeRewardsPush
);

export const getGymSubscribe = createSelector(
  getCustomerPreferencesGym,
  placeRewardsGymObject => placeRewardsGymObject && placeRewardsGymObject.placeRewardsSms
);

export const getGymAppSubscribe = createSelector(
  getCustomerPreferencesGym,
  placeRewardsGymObject => placeRewardsGymObject && placeRewardsGymObject.placeRewardsPush
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
  getCustomerPreferences,
  state => state && state.isFetching
);
