import { fromJS } from 'immutable';
import { MY_FAVORITE_STORE_REDUCER_KEY } from '../../../../../../../../constants/reducer.constants';
import getMyFavoriteStoreLabels from '../MyFavoriteStore.selector';

describe('#MyFavoriteStore Selectors', () => {
  let state;

  describe('getMyFavoriteStoreLabels', () => {
    beforeEach(() => {
      const myFavoriteStoreState = fromJS({
        success: null,
        error: null,
      });
      state = {
        [MY_FAVORITE_STORE_REDUCER_KEY]: myFavoriteStoreState,
        Labels: {
          account: {
            common: {},
          },
        },
      };
    });

    it('should return labels ', () => {
      expect(getMyFavoriteStoreLabels(state)).toBeTruthy();
    });

    it('should return correct message key', () => {
      state[MY_FAVORITE_STORE_REDUCER_KEY] = state[MY_FAVORITE_STORE_REDUCER_KEY].set('success', {
        myFavoriteStore: 'Favorite store',
      });
      expect(getMyFavoriteStoreLabels(state)).toBeDefined();
    });
  });
});
