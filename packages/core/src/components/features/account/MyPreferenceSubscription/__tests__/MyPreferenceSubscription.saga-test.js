import { put, takeLatest } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../utils/cache.util';
import {
  getSubscribeStoreSaga,
  SubscribeStoreSaga,
  setSubscribeStoreSaga,
} from '../container/MyPreferenceSubscription.saga';
import {
  setSubscribeStore,
  getSubscribeStore,
} from '../container/MyPreferenceSubscription.actions';
import constants from '../MyPreferenceSubscription.constants';

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

  describe('setSubscribeStoreSaga', () => {
    const data = {
      payload: {
        CustomerPreferences: [
          {
            preferenceMode: 'placeRewardsSms',
            isModeSelected: true,
          },
          {
            preferenceMode: 'marketingPreferenceSMS',
            isModeSelected: true,
          },
        ],
        brand: 'tcp',
        mobileNumber: '2012386357',
      },
    };
    let gen;
    beforeEach(() => {
      gen = setSubscribeStoreSaga(data);
      gen.next();
    });

    it('should dispatch setSubscribeStore action for response', () => {
      const putDescriptor = gen.next().value;
      expect(putDescriptor).toEqual(put(getSubscribeStore()));
    });
  });

  describe('SubscribeStoreSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = SubscribeStoreSaga();
      const takeLatestDescriptor = generator.next().value;
      const cachedMethod = validateReduxCache(getSubscribeStoreSaga);
      const expectedGet = takeLatest(constants.GET_SUBSCRIBE_STORE, cachedMethod);
      const expectedSet = takeLatest(constants.SET_BRAND_SUBSCRIBE_DATA, setSubscribeStoreSaga);
      expect(takeLatestDescriptor.toString()).toMatch(expectedGet.toString());
      expect(takeLatestDescriptor.toString()).toMatch(expectedSet.toString());
    });
  });
});
