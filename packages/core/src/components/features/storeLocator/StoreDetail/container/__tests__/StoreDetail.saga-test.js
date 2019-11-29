import { putResolve } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getCurrentStore, getNearByStore, fetchModuleX } from '../StoreDetail.saga';
import { setCurrentStoreInfo, setNearByStore } from '../StoreDetail.actions';
import moduleXMock from '../__mocks__/moduleX.mock';

describe('StoreDetail saga', () => {
  describe('#getCurrentStore', () => {
    let currentStoreGen;
    beforeEach(() => {
      currentStoreGen = getCurrentStore({ payload: '111421' });
    });
    it('should return correct takeLatest effect', () => {
      const received = currentStoreGen.next().value;
      expect(currentStoreGen.next(received).value).toEqual(
        putResolve(setCurrentStoreInfo(received))
      );
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
      expect(nearByStoreGen.next(received).value).toEqual(putResolve(setNearByStore(received)));
    });
  });
  describe('#fetchModuleX', () => {
    let moduleXGen;
    beforeEach(() => {
      moduleXGen = fetchModuleX({ payload: moduleXMock.referred });
    });
    it('should return correct module x latest effect', () => {
      let moduleXResponses = moduleXGen.next().value;
      moduleXResponses = moduleXGen.next().value;
      expect(moduleXResponses).toEqual(null);
    });
  });
});
