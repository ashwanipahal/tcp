import { fromJS } from 'immutable';
import MyFavoriteStoreReducer from '../MyFavoriteStore.reducer';

import CONSTANTS from '../../MyFavoriteStore.constants';

describe('MyFavoriteStoreReducer', () => {
  const initialState = fromJS({
    error: null,
    success: null,
  });

  it('should return default state', () => {
    const state = MyFavoriteStoreReducer(undefined, {});
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBeNull();
  });

  it('should be called on MyFavoriteStore request to get store', () => {
    expect(
      MyFavoriteStoreReducer(initialState, {
        type: CONSTANTS.GET_MY_FAVORITE_STORE,
      })
    ).toEqual(fromJS({ success: null, error: null }));
  });
});
