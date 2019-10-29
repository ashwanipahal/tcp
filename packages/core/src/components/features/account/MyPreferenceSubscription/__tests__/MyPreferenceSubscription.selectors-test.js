import { MY_PREFERENCE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import {
  getCustomerPreferences,
  getCustomerPreferencesTcp,
  getSmsPhone,
  getGymSmsPhone,
} from '../container/MyPreferenceSubscription.selectors';

describe('#My Preference Selectors', () => {
  const subscribeStoreData = {
    smsPhone: '2012386357',
    gymSmsPhone: '2012386357',
    gymPlaceRewardsSms: true,
    placeRewardsSms: true,
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
    expect(getCustomerPreferences(state).placeRewardsSms).toEqual(
      subscribeStoreData.placeRewardsSms
    );
  });

  it('#getCustomerPreferencesTcp should return gymPlaceRewardsSms state', () => {
    expect(getCustomerPreferencesTcp(state)).toEqual(subscribeStoreData);
  });

  it('#getSmsPhone should return smsPhone state', () => {
    expect(getSmsPhone(state)).toEqual(subscribeStoreData.smsPhone);
  });

  it('#getGymSmsPhone should return gymSmsPhone state', () => {
    expect(getGymSmsPhone(state)).toEqual(subscribeStoreData.gymSmsPhone);
  });
});
