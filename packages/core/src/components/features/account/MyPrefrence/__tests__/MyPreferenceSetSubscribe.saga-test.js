import { put, takeLatest } from 'redux-saga/effects';
import {
  setSubscribeStoreSaga,
  SubscribeBrandStoreSaga,
} from '../container/MyPreferenceSetSubscribe.saga';
import { getSubscribeStore } from '../container/MyPreference.actions';
import constants from '../MyPrefrence.constants';

describe('setSubscribeStoreSaga saga', () => {
  describe('setSubscribeStoreSaga', () => {
    let gen;
    beforeEach(() => {
      gen = setSubscribeStoreSaga({});
      gen.next();
      gen.next();
    });

    it('should dispatch setSubscribeStore action for response', () => {
      // const data = {
      //   payload:
      //   {
      //     CustomerPreferences: [
      //       {
      //         preferenceMode:"placeRewardsSms",
      // eslint-disable-next-line extra-rules/no-commented-out-code
      //         isModeSelected:true
      //       },
      //       {
      //         preferenceMode:"marketingPreferenceSMS",
      // eslint-disable-next-line extra-rules/no-commented-out-code
      //         isModeSelected:true
      //       }
      //     ],
      //     brand: "tcp",
      //     mobileNumber :"2012386357",
      //   }
      // };

      const customerPreferences = [
        {
          preferenceMode: 'placeRewardsSms',
          isModeSelected: true,
        },
        {
          preferenceMode: 'marketingPreferenceSMS',
          isModeSelected: true,
        },
      ];
      const brand = 'tcp';
      const mobileNumber = '2012386357';

      const putDescriptor = gen.next(mobileNumber, customerPreferences, brand).value;
      expect(putDescriptor).toEqual(put(getSubscribeStore()));
    });
  });

  describe('SubscribeBrandStoreSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = SubscribeBrandStoreSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.SET_BRAND_SUBSCRIBE_DATA, setSubscribeStoreSaga);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
