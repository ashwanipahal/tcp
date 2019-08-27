import { all, put } from 'redux-saga/effects';
import { getUserInfoSaga } from '../User.saga';
import { setUserInfo } from '../User.actions';
import { setCountry, setCurrency, setLanguage } from '../../../../../../reduxStore/actions';

describe('User saga', () => {
  describe('getUserInfoSaga', () => {
    let gen;
    beforeEach(() => {
      gen = getUserInfoSaga();
      gen.next();
    });

    it('should dispatch setUserInfo action for success resposnse', () => {
      const response = {
        firstName: 'test',
        country: 'US',
        currency: 'USD',
        language: 'es',
      };
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(
        all([
          put(setUserInfo(response)),
          put(setCountry(response.country)),
          put(setCurrency(response.currency)),
          put(setLanguage(response.language)),
        ])
      );
    });
  });
});
