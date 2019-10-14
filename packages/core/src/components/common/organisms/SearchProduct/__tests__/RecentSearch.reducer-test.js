import { fromJS } from 'immutable';
import RecentSearchReducer from '../RecentSearch.reducer';

describe('RecentSearchReducer tests', () => {
  it('should handle success recent search  add success', () => {
    const initialState = fromJS({ searchTermList: [] });

    expect(
      RecentSearchReducer(initialState, {
        type: '@@Navigation-SET_RECENT_SEARCH',
        payload: { searchTerm: 'Shoes' },
      }).size
    ).toBe(1);
  });
});
