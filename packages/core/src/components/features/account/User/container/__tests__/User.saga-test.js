import { all, put } from 'redux-saga/effects';
import { getUserInfoSaga } from '../User.saga';
import { setUserInfo, setIsRegisteredUserCallDone } from '../User.actions';
import { setAddressList } from '../../../AddressBook/container/AddressBook.actions';

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
      };
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(
        all([
          put(setUserInfo(response)),
          put(setAddressList(response.contactList)),
          put(setIsRegisteredUserCallDone()),
        ])
      );
    });
  });
});
