import { put } from 'redux-saga/effects';
import { getMyFavoriteStoreSaga } from '../MyFavoriteStore.saga';
import { setFavoriteStore } from '../../../../../User/container/User.actions';

describe('MyFavoriteStore saga', () => {
  describe('getMyFavoriteStoreSaga', () => {
    let gen;
    const payload = {
      name: 'new hatom',
      basicInfo: {
        id: 1221,
        city: 'NY',
      },
    };
    beforeEach(() => {
      gen = getMyFavoriteStoreSaga({ payload });
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
