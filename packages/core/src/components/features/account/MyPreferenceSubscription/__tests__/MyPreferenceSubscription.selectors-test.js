import { MY_PREFERENCE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import {
  getCustomerPreferences,
  getCustomerPreferencesTcp,
  getCustomerPreferencesGym,
  getSmsPhone,
  getGymSmsPhone,
} from '../container/MyPreferenceSubscription.selectors';

describe('#My Preference Selectors', () => {
  const subscribeStoreData = {
    smsPhone: '2012386357',
    gymSmsPhone: '2012386357',
    marketingPreferenceSMS: true,
    gymPlaceRewardsSms: true,
    placeRewardsSms: true,
    customerPreferencesResult: {
      placeRewardsSms: true,
      marketingPreferenceSMS: true,
    },
    CustomerPreferences: [
      {
        preferenceMode: 'marketingPreferenceSMS',
        isModeSelected: true,
      },
      {
        preferenceMode: 'placeRewardsSms',
        isModeSelected: true,
      },
    ],
  };

  const state = {
    [MY_PREFERENCE_REDUCER_KEY]: {
      subscribeStoreData: {
        smsPhone: '2012386357',
        gymSmsPhone: '2012386357',
        CustomerPreferencesGym: [
          {
            preferenceMode: 'placeRewardsSms',
            isModeSelected: true,
          },
          {
            preferenceMode: 'marketingPreferenceSMS',
            isModeSelected: true,
          },
        ],
        CustomerPreferences: [
          {
            preferenceMode: 'marketingPreferenceSMS',
            isModeSelected: true,
          },
          {
            preferenceMode: 'placeRewardsSms',
            isModeSelected: true,
          },
        ],
      },
    },
  };

  it('#getCustomerPreferences should return placeRewardsSms state', () => {
    expect(getCustomerPreferences(state).CustomerPreferences).toEqual(
      subscribeStoreData.CustomerPreferences
    );
  });

  it('#getCustomerPreferencesTcp should return getCustomerPreferencesTcp state', () => {
    expect(getCustomerPreferencesTcp(state)).toEqual(subscribeStoreData.customerPreferencesResult);
  });

  it('#getCustomerPreferencesGym should return getCustomerPreferencesGym state', () => {
    expect(getCustomerPreferencesGym(state)).toEqual(subscribeStoreData.customerPreferencesResult);
  });

  it('#getSmsPhone should return smsPhone state', () => {
    expect(getSmsPhone(state)).toEqual(subscribeStoreData.smsPhone);
  });

  it('#getGymSmsPhone should return gymSmsPhone state', () => {
    expect(getGymSmsPhone(state)).toEqual(subscribeStoreData.gymSmsPhone);
  });
});
