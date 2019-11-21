import { put, takeLatest } from 'redux-saga/effects';
import RecentSearchSaga, { recentSearch } from '../RecentSearch.saga';
import { setRecentSearch } from '../RecentSearch.actions';
import RECENT_SEARCH_CONSTANTS from '../RecentSearch.constants';

describe('RecentSearchSaga', () => {
  it('should return correct takeLatest effect', () => {
    const generator = RecentSearchSaga();
    const takeLatestDescriptor = generator.next().value;
    const expected = takeLatest(RECENT_SEARCH_CONSTANTS.SET_RECENT_SEARCH_DATA, recentSearch);
    expect(takeLatestDescriptor).toEqual(expected);
  });

  it('should dispatch setRecentSearch action for success resposnse', () => {
    const payload = { searchTerm: 'Shoes' };
    const recentSearchGen = recentSearch({ payload });
    const putDescriptor = recentSearchGen.next().value;
    expect(putDescriptor).toEqual(put(setRecentSearch({ searchTerm: 'Shoes' })));
  });
});
