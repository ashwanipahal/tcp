import NavigationReducer from '../container/Navigation.reducer';

describe('NavigationReducer reducer', () => {
  it('should return empty Navigation as default state', () => {
    expect(NavigationReducer(undefined, {})).toEqual({ cacheUntil: null });
  });
});
