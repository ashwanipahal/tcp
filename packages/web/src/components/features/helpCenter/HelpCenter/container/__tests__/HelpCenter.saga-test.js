import { put, takeLatest } from 'redux-saga/effects';
import {fetchSubnavigationData} from '../HelpCenter.saga';
import { setNavigationData } from '../HelpCenter.actions';

describe('fetchSubnavigationData List saga', () => {
  describe('fetchSubnavigationData', () => {
    let helpCenterGen;
    beforeEach(() => {
      helpCenterGen = fetchSubnavigationData({ brand: 'TCP' });
    });

    it('should dispatch setAccountNavigationList action for success resposnse', () => {
      const response = {
        body: {
          subNavigation: [],
        },
      };
      const {
        body: { subNavigation },
      } = response;
      const putDescriptor = helpCenterGen.next(subNavigation).value;
      expect(putDescriptor).not.toBe(null);
    });
  });
});
