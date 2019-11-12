import { put, takeLatest } from 'redux-saga/effects';
import {setLoaderState} from '@tcp/web/src/components/features/content/Loader/container/Loader.actions';
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
      gen.next(subscribeStoreData);
      const putDescriptor = gen.next().value;
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
      gen.next();
    });

    it('should dispatch setSubscribeStore action for response', () => {
      gen.next();
      const putDescriptor = gen.next().value;
      expect(putDescriptor).toEqual(
        put(
          getSubscribeStore({
            ignoreCache: true,
          })
        )
      );
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
