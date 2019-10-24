import { MY_PREFERENCE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import {
  getPlaceRewardsSms,
  getGymPlaceRewardsSms,
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

  it('#getPlaceRewardsSms should return placeRewardsSms state', () => {
    expect(getPlaceRewardsSms(state)).toEqual(subscribeStoreData.placeRewardsSms);
  });

  it('#getGymPlaceRewardsSms should return gymPlaceRewardsSms state', () => {
    expect(getGymPlaceRewardsSms(state)).toEqual(subscribeStoreData.gymPlaceRewardsSms);
  });

  it('#getSmsPhone should return smsPhone state', () => {
    expect(getSmsPhone(state)).toEqual(subscribeStoreData.smsPhone);
  });

  it('#getGymSmsPhone should return gymSmsPhone state', () => {
    expect(getGymSmsPhone(state)).toEqual(subscribeStoreData.gymSmsPhone);
  });
});
