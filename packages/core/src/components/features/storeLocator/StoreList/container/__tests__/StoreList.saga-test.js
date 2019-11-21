import { getStoresList } from '../StoreList.saga';

describe('Store List saga', () => {
  describe('#getStoresList', () => {
    let storeListGen;
    beforeEach(() => {
      storeListGen = getStoresList({});
    });
    it('should return correct takeLatest effect', () => {
      let takeLatestDescriptor = storeListGen.next().value;
      takeLatestDescriptor = storeListGen.next().value;
      expect(takeLatestDescriptor).toEqual(null);
    });
  });
});
