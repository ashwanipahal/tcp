import { put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getCurrentStore, getNearByStore } from '../StoreDetail.saga';
import { setCurrentStoreInfo, setNearByStore } from '../StoreDetail.actions';

describe('Track Order saga', () => {
  describe('#getCurrentStore', () => {
    let currentStoreGen;
    beforeEach(() => {
      currentStoreGen = getCurrentStore({ payload: '111421' });
    });
    it('should return correct takeLatest effect', () => {
      const received = currentStoreGen.next().value;
      expect(currentStoreGen.next(received).value).toEqual(put(setCurrentStoreInfo(received)));
    });
  });
  describe('#getNearByStore', () => {
    let nearByStoreGen;
    const payloadArgs = {
      storeLocationId: 111421,
      getNearby: true,
      latitude: 40.76004,
      longitude: -73.91805,
      currentStore: fromJS({
        basicInfo: {
          id: '111421',
        },
      }),
    };
    beforeEach(() => {
      nearByStoreGen = getNearByStore({ payloadArgs });
    });
    it('should return correct takeLatest effect', () => {
      const received = nearByStoreGen.next().value;
      expect(nearByStoreGen.next(received).value).toEqual(put(setNearByStore(received)));
    });
  });
});
