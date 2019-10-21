import { createSelector } from 'reselect';
import { MY_PREFERENCE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

const getState = state => state[MY_PREFERENCE_REDUCER_KEY];

export const getSmsSubscriptionState = createSelector(
  getState,
  state => state && state.subscribeStoreData && state.subscribeStoreData.smsSubscriptionState
);

export const getGymSmsSubscriptionState = createSelector(
  getState,
  state => state && state.subscribeStoreData && state.subscribeStoreData.gymSmsSubscriptionState
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
