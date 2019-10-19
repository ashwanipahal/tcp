import { MY_PREFERENCE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import {
  getSmsSubscriptionState,
  getGymSmsSubscriptionState,
  getSmsPhone,
  getGymSmsPhone,
} from '../container/MyPreference.selectors';

describe('#My Preference Selectors', () => {
  const subscribeStoreData = {
    smsSubscriptionState: 'ATTEMPTED',
    gymSmsSubscriptionState: 'ATTEMPTED',
    smsPhone: '2012386357',
    gymSmsPhone: '2012386357',
  };

  const state = {
    [MY_PREFERENCE_REDUCER_KEY]: {
      subscribeStoreData: {
        smsSubscriptionState: 'ATTEMPTED',
        gymSmsSubscriptionState: 'ATTEMPTED',
        smsPhone: '2012386357',
        gymSmsPhone: '2012386357',
      },
    },
  };

  it('#getSmsSubscriptionState should return SmsSubscriptionState state', () => {
    expect(getSmsSubscriptionState(state)).toEqual(subscribeStoreData.smsSubscriptionState);
  });

  it('#getGymSmsSubscriptionState should return gymSmsSubscriptionState state', () => {
    expect(getGymSmsSubscriptionState(state)).toEqual(subscribeStoreData.gymSmsSubscriptionState);
  });

  it('#getSmsPhone should return smsPhone state', () => {
    expect(getSmsPhone(state)).toEqual(subscribeStoreData.smsPhone);
  });

  it('#getGymSmsPhone should return gymSmsPhone state', () => {
    expect(getGymSmsPhone(state)).toEqual(subscribeStoreData.gymSmsPhone);
  });
});
