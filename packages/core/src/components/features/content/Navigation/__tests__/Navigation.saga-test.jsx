import { takeLatest } from 'redux-saga/effects';
import NavigationSaga, { fetchNavigationData } from '../container/Navigation.saga';
import { validateReduxCache } from '../../../../../utils/cache.util';
import { FETCH_NAVIGATION_DATA } from '../container/Navigation.constants';

describe('Navigatio saga', () => {
  describe('NavigationSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = NavigationSaga();
      const cachedMethod = validateReduxCache(fetchNavigationData);
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(FETCH_NAVIGATION_DATA, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});
