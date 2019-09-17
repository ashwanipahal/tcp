import { put } from 'redux-saga/effects';
import { getMyFavoriteStoreSaga } from '../MyFavoriteStore.saga';
import { setFavoriteStore } from '../../../../../User/container/User.actions';

describe('MyFavoriteStore saga', () => {
  describe('getMyFavoriteStoreSaga', () => {
    let gen;
    beforeEach(() => {
      gen = getMyFavoriteStoreSaga();
      gen.next();
    });

    it('should dispatch setFavoriteStore action for success resposnse', () => {
      const response = {};
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(
        put(
          setFavoriteStore({
            favoriteStore: response,
          })
        )
      );
    });
  });
});
