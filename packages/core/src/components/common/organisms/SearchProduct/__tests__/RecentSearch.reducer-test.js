import RecentSearchReducer from '../RecentSearch.reducer';

describe('RecentSearchReducer tests', () => {
  it('should handle success recent search  add success', () => {
    const initialState = { searchTermList: [] };

    expect(
      Object.keys(
        RecentSearchReducer(initialState, {
          type: '@@Navigation-SET_RECENT_SEARCH',
          payload: { searchTerm: 'Shoes' },
        })
      ).length
    ).toBe(1);
  });
});
