import { put, takeLatest } from 'redux-saga/effects';
import { getSubscribeStoreSaga, SubscribeStoreSaga } from '../container/MyPreference.saga';
import { setSubscribeStore } from '../container/MyPreference.actions';
import constants from '../MyPrefrence.constants';

describe('getSubscribeStoreSaga saga', () => {
  describe('getSubscribeStoreSaga', () => {
    let gen;
    beforeEach(() => {
      gen = getSubscribeStoreSaga({});
      gen.next();
    });

    it('should dispatch setSubscribeStore action for response', () => {
      const subscribeStoreData = {
        CustomerPreferencesGym: [],
        CustomerPreferences: [
          {
            preferenceMode: 'gymPlaceRewardsSms',
            isModeSelected: true,
          },
          {
            preferenceMode: 'gymMarketingPreferenceSMS',
            isModeSelected: true,
          },
        ],
        gymSmsPhone: '',
        gymSmsSubscriptionState: '',
        smsPhone: '2012386357',
        smsSubscriptionState: 'ATTEMPTED',
      };
      const putDescriptor = gen.next(subscribeStoreData).value;
      expect(putDescriptor).toEqual(put(setSubscribeStore(subscribeStoreData)));
    });
  });

  describe('SubscribeStoreSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = SubscribeStoreSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.GET_SUBSCRIBE_STORE, getSubscribeStoreSaga);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
